'use strict';

const Venue = require('../models/venue');
const {
  app,
  createVenue,
  shared
} = require('../../../../support/spec/specHelper');

function aValidVenueShowAll(promise, length) {
  let venues;

  return Venue
    .find({})
    .lean()
    .then((allVenues) => {
      venues = allVenues;
      return promise;
    })
    .then(({ body }) => {
      expect(body.venues.length).to.eq(length || venues.length);
    });
}

describe('venue requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /venues', function() {
    let agent;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
    });

    afterEach(function() {
      return Promise.all([
        Venue.remove()
      ]);
    });

    context('when no bounds are passed through', function() {
      beforeEach(function() {
        const endpoint = '/api/venues';
        const promises = [];

        for (let i = 10; i > 0; i--) {
          promises.push(createVenue());
        }

        return Promise.all(promises)
          .then(() => {
            this.promise = agent
              .get(endpoint);
          });
      });

      shared.itBehavesLike('a valid request', { statusCode: 200 });

      it('returns all the venues', function() {
        return aValidVenueShowAll(this.promise);
      });
    });

    context('when bounds are passed through', function() {
      beforeEach(function() {
        const promises = [];

        const params = {
          latitudeMin: 34.999999,
          latitudeMax: 39.000001,
          longitudeMin: -79.00001,
          longitudeMax: -76.99999
        };
        const latitude = faker.random.number({ min: 35, max: 38 }) + Math.random();
        const longitude = faker.random.number({ min: -79, max: -77 }) + Math.random();
        const insideBoundsParams = {
          latitude,
          longitude
        };
        const outsideLatitudeBoundsParams = {
          latitude: faker.random.number({ min: 30, max: 33 }) + Math.random(),
          longitude
        };
        const outsideLongitudeBoundsParams = {
          latitude,
          longitude: faker.random.number({ min: -74, max: -72 }) + Math.random()
        };

        for (let i = 6; i > 0; i--) {
          promises.push(createVenue(insideBoundsParams));
        }
        for (let i = 4; i > 0; i--) {
          promises.push(createVenue(outsideLatitudeBoundsParams));
        }
        for (let i = 5; i > 0; i--) {
          promises.push(createVenue(outsideLongitudeBoundsParams));
        }

        return Promise.all(promises)
          .then(() => {
            const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
            const endpoint = `/api/venues?${queryString}`;

            this.promise = agent
              .get(endpoint);
          });
      });

      shared.itBehavesLike('a valid request', { statusCode: 200 });

      it('returns all the venues that can be found within those lat/lng bounds', function() {
        return aValidVenueShowAll(this.promise, 6);
      });
    });
  });
});
