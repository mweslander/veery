'use strict';

const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
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

      return Promise.all(promises, extraVenues(admin));
    })
    .then(() => admin);
}

describe('admin venue requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /admin/venues', function() {
    let agent;
    let endpoint;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/admin/venues';
    });

    context('when the user is an admin', function() {
      beforeEach(function() {
        return establishSpecResources(agent, 'admin')
          .then(() => {
            this.promise = agent
              .get(endpoint);
          });
      });

      afterEach(function() {
        return Promise.all([
          User.remove(),
          Venue.remove()
        ]);
      });

      shared.itBehavesLike('a protected GET endpoint');
      shared.itBehavesLike('a valid request', { statusCode: 200 });

      it('returns all the venues', function() {
        let venues;

        return Venue
          .find({})
          .lean()
          .then((allVenues) => {
            venues = allVenues;
            return this.promise;
          })
          .then(({ body }) => {
            expect(body.venues.length).to.eq(venues.length);
          });
      });
    });

    context('when the user is an venueAdmin', function() {
      let venueAdmin;

      beforeEach(function() {
        const extraVenues = (admin) => {
          const promises = [];

          for (let i = 2; i > 0; i--) {
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

      it('only returns the venues the venueAdmin has access to', function() {
        return this.promise
          .then(({ body }) => {
            const venueAdmins = body.venues[0].venueAdmins.map((admin) => admin.toString());
            expect(body.venues.length).to.eq(2);
            expect(venueAdmins).to.include(venueAdmin._id.toString());
          });
      });
    });
  });
});
