'use strict';

const Event = require('../../../models/event');
const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
  createEvent,
  createUser,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../../../support/spec/specHelper');

function establishSpecResources(agent, role, extraVenues = () => []) {
  let admin;

  return signInAndCreateUser(agent, role)
    .then((newAdmin) => {
      admin = newAdmin;
      const promises = [];

      for (let i = 10; i > 0; i--) {
        promises.push(createVenue());
      }

      return Promise.all(_.flatten([promises, extraVenues(admin)]));
    })
    .then((venues) => {
      const eventPromises = [];

      for (let i = 2; i > 0; i--) {
        eventPromises.push(createEvent({ venue: venues[venues.length - 1]._id }));
      }

      for (let i = 2; i > 0; i--) {
        eventPromises.push(createEvent({ venue: venues[venues.length - 2]._id }));
      }

      for (let i = 10; i > 0; i--) {
        eventPromises.push(createEvent({ venue: venues[0]._id }));
        eventPromises.push(createEvent({ venue: venues[1]._id }));
      }

      return Promise.all(eventPromises);
    })
    .then(() => admin);
}

describe('admin event requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /admin/events', function() {
    let agent;
    let endpoint;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/admin/events';
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
          .then(() => {
            this.promise = agent
              .get(endpoint);
          });
      });

      shared.itBehavesLike('a protected GET endpoint');
      shared.itBehavesLike('a valid request', { statusCode: 200 });

      it('returns all the events', function() {
        let events;

        return Event
          .find({})
          .lean()
          .then((allEvents) => {
            events = allEvents;
            return this.promise;
          })
          .then(({ body }) => {
            expect(body.events.length).to.eq(events.length);
          });
      });
    });

    context('when the user is an venueAdmin', function() {
      context('when the venueAdmin is the only venueAdmin of the venues', function() {
        let venueAdmin;

        beforeEach(function() {
          const extraVenues = (admin) => {
            const promises = [];

            for (let i = 3; i > 0; i--) {
              promises.push(createVenue({ venueAdmins: [admin._id] }));
            }

            return promises;
          };

          return establishSpecResources(agent, 'venueAdmin', extraVenues)
            .then((newAdmin) => {
              venueAdmin = newAdmin;

              this.promise = agent
                .get(endpoint);
            });
        });

        shared.itBehavesLike('a protected GET endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('only returns the events that belong to venues that the venueAdmin has access to', function() {
          return this.promise
            .then(({ body }) => {
              const eventVenue = body.events[0].venue;
              const venueAdmins = eventVenue.venueAdmins.map((admin) => admin.toString());
              expect(body.events.length).to.eq(4);
              expect(venueAdmins).to.include(venueAdmin._id.toString());
            });
        });
      });

      context('when another venueAdmin is also a venueAdmin of the same venue', function() {
        let venueAdmin;

        beforeEach(function() {
          return createUser('venueAdmin')
            .then((anotherVenueAdmin) => {
              const extraVenues = (admin) => {
                const promises = [];

                for (let i = 3; i > 0; i--) {
                  promises.push(createVenue({ venueAdmins: [admin._id, anotherVenueAdmin._id] }));
                }

                return promises;
              };

              return establishSpecResources(agent, 'venueAdmin', extraVenues);
            })
            .then((admin) => {
              venueAdmin = admin;

              this.promise = agent
                .get(endpoint);
            });
        });

        shared.itBehavesLike('a protected GET endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 200 });

        it('only returns the events that belong to venues that the venueAdmin has access to', function() {
          return this.promise
            .then(({ body }) => {
              const eventVenue = body.events[0].venue;
              const venueAdmins = eventVenue.venueAdmins.map((admin) => admin.toString());
              expect(body.events.length).to.eq(4);
              expect(venueAdmins).to.include(venueAdmin._id.toString());
            });
        });
      });
    });
  });
});
