
'use strict';

import React from 'react';

import Event from '../../../api/app/models/event';
import Venue from '../../../api/app/models/venue';
import {
  createEvent,
  createVenue
} from '../../../../support/spec/specHelper';
import App from './index';
import venuesService from '../../services/venues';

function aValidShowAllRequest(promise, showAll, params) {
  return promise
    .then(() => {
      const [showAllParams] = showAll.firstCall.args;
      expect(showAllParams).to.deep.eq(params);
    });
}

function aValidStateSet(promise, app, mockFocusedVenue) {
  return promise
    .then(() => {
      const { events, focusedVenue, venues } = app.state();

      expect(events.length).to.be.above(0);
      expect(focusedVenue._id.toString()).to.eq(mockFocusedVenue._id.toString());
      expect(venues.length).to.be.above(0);
    });
}

describe('App', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();

    return Promise.all([
      Event.remove(),
      Venue.remove()
    ]);
  });

  describe('searchForVenues', function() {
    let params;

    beforeEach(function() {
      params = {
        latitudeMin: faker.address.latitude(),
        latitudeMax: faker.address.latitude(),
        longitudeMin: faker.address.longitude(),
        longitudeMax: faker.address.longitude()
      };
    });

    context('when venues are found with params criteria', function() {
      let showAll;
      let venuesWithEvents;

      beforeEach(function() {
        const promises = [];

        for (let i = 10; i > 0; i--) {
          promises.push(createVenue());
        }

        return Promise.all(promises)
          .then((createdVenues) => {
            const eventPromises = [];

            createdVenues.forEach((venue) => {
              eventPromises.push(createEvent({
                startDate: faker.date.future(),
                startTime: '9:00 pm',
                title: faker.random.word(),
                venue: venue._id
              }));
            });

            return Promise.all(eventPromises);
          })
          .then(() => {
            return Venue
              .find({})
              .populate({
                path: 'events',
                populate: { path: 'venue' }
              });
          })
          .then((venues) => {
            venuesWithEvents = venues;
            showAll = this.sandbox.stub(venuesService, 'showAll').returns(Promise.resolve(venuesWithEvents));
            return;
          });
      });

      context('when the focusedVenue is still a part of the venues coming back', function() {
        let app;
        let focusedVenue;
        let promise;

        beforeEach(function() {
          focusedVenue = venuesWithEvents[8];
          app = shallow(<App />);
          app.setState({ focusedVenue });
          promise = app.instance().searchForVenues(params);
        });

        it('calls showAll with the new params', function() {
          return aValidShowAllRequest(promise, showAll, params);
        });

        it('sets events, venues, and the same focusedVenue', function() {
          return aValidStateSet(promise, app, focusedVenue);
        });
      });

      context('when the focusedVenue is not a part of the venues coming back', function() {
        let app;
        let focusedVenue;
        let promise;

        beforeEach(function() {
          const eventsFromVenues = venuesWithEvents.map(venue => venue.events);
          const formattedEvents = _.sortBy(_.flatten(eventsFromVenues), ['startDate', 'startTime']);

          focusedVenue = formattedEvents[0].venue;
          app = shallow(<App />);
          promise = app.instance().searchForVenues(params);
        });

        it('calls showAll with the new params', function() {
          return aValidShowAllRequest(promise, showAll, params);
        });

        it('sets events, venues, and focusedVenue to the first venue', function() {
          return aValidStateSet(promise, app, focusedVenue);
        });
      });
    });

    context('when venues are not found with the params criteria', function() {
      let app;
      let promise;
      let showAll;

      beforeEach(function() {
        showAll = this.sandbox.stub(venuesService, 'showAll').returns(Promise.resolve([]));
        app = shallow(<App />);
        promise = app.instance().searchForVenues(params);
      });

      it('calls showAll with the new params', function() {
        return aValidShowAllRequest(promise, showAll, params);
      });

      it('sets events, focusedVenue, and venues', function() {
        return promise
          .then(() => {
            const { events, focusedVenue, venues } = app.state();
            expect(events.length).to.eq(0);
            expect(focusedVenue).not.to.exist;
            expect(venues.length).to.eq(0);
          });
      });
    });
  });
});
