'use strict';

const flatten = require('lodash').flatten;

const Event = require('../../../models/event');
const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
  createEvent,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../spec/specHelper');

function establishSpecResources(agent, role, venuesCallback = () => {}, extraEvents = () => []) {
  return signInAndCreateUser(agent, role)
    .then((admin) => venuesCallback(admin))
    .then((venues = []) => {
      const promises = [];

      for (let i = 10; i > 0; i--) {
        promises.push(createEvent({ venue: venues[0]._id }));
        promises.push(createEvent({ venue: venues[1]._id }));
      }

      for (let i = 2; i > 0; i--) {
        promises.push(createEvent({ venue: venues[venues.length - 1]._id }));
      }

      return Promise.all(flatten([promises, extraEvents(venues)]));
    });
}

function aValidEventDeletion(promise, eventForDeletion, length) {
  return promise
    .then(() => Event.find({}).lean())
    .then((events) => {
      expect(events.map((event) => event._id)).not.to.include(eventForDeletion._id);
      expect(events.length).to.eq(length);
    });
}

describe('admin event requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('DELETE /admin/events/:id', function() {
    let agent;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
    });

    afterEach(function() {
      return Promise.all([
        Event.remove(),
        User.remove(),
        Venue.remove()
      ]);
    });

    context('when the user is an admin', function() {
      context('when just destroying one event', function() {
        let eventForDeletion;

        beforeEach(function() {
          const venuesCallback = () => {
            const promises = [];

            for (let i = 10; i > 0; i--) {
              promises.push(createVenue());
            }

            return Promise.all(promises);
          };

          return establishSpecResources(agent, 'admin', venuesCallback)
            .then((events) => {
              eventForDeletion = events[0];
              const endpoint = `/api/admin/events/${eventForDeletion._id}`;

              this.promise = agent
                .delete(endpoint);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('deletes the event', function() {
          return aValidEventDeletion(this.promise, eventForDeletion, 21);
        });
      });

      context('when the user has specified a delete all request on an event with a weekly frequency', function() {
        let eventForDeletion;

        beforeEach(function() {
          const venuesCallback = () => {
            const promises = [];

            for (let i = 10; i > 0; i--) {
              promises.push(createVenue());
            }

            return Promise.all(promises);
          };
          const extraEvents = (venues) => {
            const promises = [];

            for (let i = 20; i > 0; i--) {
              promises.push(createEvent({ frequency: 'weekly', venue: venues[0]._id }));
            }

            return promises;
          };

          return establishSpecResources(agent, 'admin', venuesCallback, extraEvents)
            .then((events) => {
              eventForDeletion = events[events.length - 1];
              const endpoint = `/api/admin/events/${eventForDeletion._id}`;

              this.promise = agent
                .delete(`${endpoint}?destroyAll=true`);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('deletes the event and all the other weekly events of that venue', function() {
          return aValidEventDeletion(this.promise, eventForDeletion, 22);
        });
      });
    });

    context('when the user is a venueAdmin', function() {
      let venuesCallback;

      beforeEach(function() {
        venuesCallback = (venueAdmin) => {
          const promises = [];

          for (let i = 10; i > 0; i--) {
            promises.push(createVenue());
          }

          for (let i = 3; i > 0; i--) {
            promises.push(createVenue({ venueAdmins: [venueAdmin._id] }));
          }

          return Promise.all(promises);
        };
      });

      context('when the event belongs to a venue of the venueAdmin', function() {
        let eventForDeletion;

        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', venuesCallback)
            .then((events) => {
              eventForDeletion = events[events.length - 1];
              const endpoint = `/api/admin/events/${eventForDeletion._id}`;

              this.promise = agent
                .delete(endpoint);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('deletes the event', function() {
          return aValidEventDeletion(this.promise, eventForDeletion, 21);
        });
      });

      context('when the event does not belong to a venue of the venueAdmin', function() {
        let deleteAttemptedEvent;

        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', venuesCallback)
            .then((events) => {
              deleteAttemptedEvent = events[0];
              const endpoint = `/api/admin/events/${deleteAttemptedEvent._id}`;

              this.promise = agent
                .delete(endpoint);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('an invalid request', { statusCode: 403 });

        it('does not delete the event', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => Event.find({}).lean())
            .then((events) => {
              expect(events.map((event) => event._id)).to.include(deleteAttemptedEvent._id);
              expect(events.length).to.eq(22);
            });
        });
      });
    });
  });
});
