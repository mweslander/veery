'use strict';

const googleMaps = require('../../../../config/googleMaps');

const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
  createUser,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../spec/specHelper');

function establishSpecResources(agent, role, callback) {
  return signInAndCreateUser(agent, role)
    .then(callback)
    .then((newVenue) => newVenue);
}

function aValidVenueUpdate(preUpdateVenue, promise, oldValue, newValue, key = 'name') {
  return promise
    .then(() => Venue.findById(preUpdateVenue._id))
    .then((postUpdateVenue) => {
      expect(preUpdateVenue[key]).to.eq(oldValue);
      expect(postUpdateVenue[key]).to.eq(newValue);
    });
}

describe('admin venue requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('PUT /admin/venues/:id', function() {
    let agent;
    let expectedLatitude;
    let expectedLongitude;
    let geocode;
    let name;
    let newName;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      name = faker.hacker.noun();
      newName = faker.hacker.verb();

      expectedLatitude = faker.random.number();
      expectedLongitude = faker.random.number();
      geocode = this.sandbox.stub(googleMaps, 'geocode').returns(Promise.resolve({
        lat: expectedLatitude,
        lng: expectedLongitude
      }));
    });

    afterEach(function() {
      return Promise.all([
        User.remove(),
        Venue.remove()
      ]);
    });

    context('when the editor is an admin', function() {
      context('when updating basic attributes', function() {
        let venue;

        beforeEach(function() {
          return establishSpecResources(agent, 'admin', () => createVenue({ name }))
            .then((newVenue) => {
              venue = newVenue;
              const endpoint = `/api/admin/venues/${newVenue._id}`;
              const params = {
                name: newName,
                address: venue.address,
                city: venue.city,
                state: venue.state,
                zipCode: venue.zipCode
              };

              this.promise = agent
                .put(endpoint)
                .send(params);
            });
        });

        shared.itBehavesLike('a protected PUT endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 202 });

        it('updates the venue', function() {
          return aValidVenueUpdate(venue, this.promise, name, newName);
        });

        it('does not call geocode', function() {
          return this.promise
            .then(() => {
              expect(geocode.called).to.be.false;
            });
        });
      });

      context('when updating a part of the address', function() {
        let address;
        let venue;

        beforeEach(function() {
          address = faker.address.streetAddress();

          return establishSpecResources(agent, 'admin', () => createVenue({ name }))
            .then((newVenue) => {
              venue = newVenue;
              const endpoint = `/api/admin/venues/${venue._id}`;
              const params = {
                name: newName,
                address,
                city: venue.city,
                state: venue.state,
                zipCode: venue.zipCode
              };

              this.promise = agent
                .put(endpoint)
                .send(params);
            });
        });

        shared.itBehavesLike('a protected PUT endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 202 });

        it('calls geocode and updates the longitude and longitude', function() {
          return aValidVenueUpdate(venue, this.promise, venue.longitude, expectedLongitude, 'longitude')
            .then(() => {
              expect(geocode.called).to.be.true;
            });
        });
      });

      context('when updating with another venueAdmin', function() {
        let venue;
        let newVenueAdmin;

        beforeEach(function() {
          return createUser('venueAdmin')
            .then((newAdmin) => {
              newVenueAdmin = newAdmin;
              const callback = (anotherVenueAdmin) => {
                return createVenue({ name, venueAdmins: [anotherVenueAdmin._id] });
              };

              return establishSpecResources(agent, 'admin', callback);
            })
            .then((newVenue) => {
              venue = newVenue;
              const endpoint = `/api/admin/venues/${newVenue._id}`;

              this.promise = agent
                .put(endpoint)
                .send({ name: newName, venueAdmins: [newVenueAdmin._id] });
            });
        });

        shared.itBehavesLike('a protected PUT endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 202 });

        it('updates the venue', function() {
          return aValidVenueUpdate(venue, this.promise, name, newName);
        });

        it('adds on the venueAdmin', function() {
          return this.promise
            .then(() => Venue.findById(venue._id))
            .then((postUpdateVenue) => {
              const venueAdmins = postUpdateVenue.venueAdmins.map((admin) => admin.toString());
              expect(venue.venueAdmins.length).to.eq(1);
              expect(postUpdateVenue.venueAdmins.length).to.eq(2);
              expect(venueAdmins).to.include(newVenueAdmin._id.toString());
            });
        });
      });

      context('when updating with venueAdmins that do not exist yet', function() {
        it('updates the venue');
        it('emails venueAdmins');
      });
    });

    context('when the editor is a venueAdmin', function() {
      context('when editing a venue belonging to that venueAdmin', function() {
        let venue;

        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', (venueAdmin) => createVenue({ name, venueAdmins: [venueAdmin._id] }))
            .then((newVenue) => {
              venue = newVenue;
              const endpoint = `/api/admin/venues/${newVenue._id}`;

              this.promise = agent
                .put(endpoint)
                .send({ name: newName });
            });
        });

        shared.itBehavesLike('a protected PUT endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 202 });

        it('updates the venue', function() {
          return aValidVenueUpdate(venue, this.promise, name, newName);
        });
      });

      context('when editing a venue not belonging to that venueAdmin', function() {
        let venue;

        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', () => createVenue({ name, venueAdmins: [] }))
            .then((newVenue) => {
              venue = newVenue;
              const endpoint = `/api/admin/venues/${newVenue._id}`;

              this.promise = agent
                .put(endpoint)
                .send({ name: newName });
            });
        });

        shared.itBehavesLike('a protected PUT endpoint');
        shared.itBehavesLike('an invalid request', { statusCode: 403 });

        it('does not update the venue', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => Venue.findById(venue._id))
            .then((postUpdateVenue) => {
              expect(venue.name).to.eq(name);
              expect(postUpdateVenue.name).to.eq(name);
            });
        });
      });
    });
  });
});
