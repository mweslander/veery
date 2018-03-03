'use strict';

const Event = require('../../../models/event');
const Venue = require('../../../models/venue');
const User = require('../../../models/user');
const {
  app,
  createEvent,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../../../support/spec/specHelper');

function establishSpecResources(agent, role, callback = createVenue) {
  let venue;

  return signInAndCreateUser(agent, role)
    .then(callback)
    .then((newVenue) => {
      venue = newVenue;
      const promises = [];

      for (let i = 10; i > 0; i--) {
        promises.push(createEvent({ venue: venue._id }));
      }

      return Promise.all(promises);
    })
    .then(() => {
      return `/api/admin/venues/${venue._id}`;
    });
}

function aValidVenueDeletion(promise) {
  return promise
    .then(() => Promise.all([Venue.find({}).lean(), Event.find({}).lean()]))
    .then(([venues, events]) => {
      expect(venues.length).to.eq(0);
      expect(events.length).to.eq(0);
    });
}

describe('admin venue requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('DELETE /admin/venues/:id', function() {
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
      beforeEach(function() {
        return establishSpecResources(agent, 'admin')
          .then((endpoint) => {
            this.promise = agent
              .delete(endpoint);
          });
      });

      shared.itBehavesLike('a protected DELETE endpoint');
      shared.itBehavesLike('a valid request', { statusCode: 200 });

      it('deletes the venue', function() {
        return aValidVenueDeletion(this.promise);
      });
    });

    context('when the user is a venueAdmin', function() {
      context('when the venueAdmin has access to that venue', function() {
        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', (venueAdmin) => createVenue({ venueAdmins: [venueAdmin._id] }))
            .then((endpoint) => {
              this.promise = agent
                .delete(endpoint);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('deletes the venue', function() {
          return aValidVenueDeletion(this.promise);
        });
      });

      context('when the venueAdmin does not have access to that venue', function() {
        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin')
            .then((endpoint) => {
              this.promise = agent
                .delete(endpoint);
            });
        });

        shared.itBehavesLike('a protected DELETE endpoint');
        shared.itBehavesLike('an invalid request', { statusCode: 403 });

        it('does not delete the venue', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => Venue.find({}).lean())
            .then((venues) => {
              expect(venues.length).to.eq(1);
            });
        });
      });
    });
  });
});
