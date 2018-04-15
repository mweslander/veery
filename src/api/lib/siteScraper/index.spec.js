'use strict';

const flattenDeep = require('lodash/flattenDeep');
const request = require('request');

const mailgun = require('../../config/mailgun');
const siteScraper = require('./index.js');
const seedVenues = require('../../database/seeds/venues');

const sites = [
  require('./sites/italy'),
  require('./sites/northCarolina'),
  require('./sites/southCarolina'),
  require('./sites/texas')
];

const Venue = require('../../app/models/venue');
const {
  createVenue
} = require('../../../../support/spec/specHelper');

function establishSpecResources(extraVenue = () => {}) {
  const promises = flattenDeep(seedVenues).map((venue) => {
    return new Venue(venue).save();
  });

  promises.push(extraVenue());

  return Promise.all(promises);
}

describe('siteScraper', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
    return Promise.all([
      Venue.remove()
    ]);
  });

  describe('run', function() {
    let run;

    beforeEach(function() {
      this.sandbox.stub(request, 'Request');
      run = siteScraper.run();
    });

    it('builds an array of promises', function() {
      expect(run.length).to.eq(flattenDeep(sites).length);
    });
  });

  describe('scrape', function() {
    let mockEvents;
    let mockSite;
    let promise;
    let siteRun;
    let venue;
    let venueDetails;

    beforeEach(function() {
      venueDetails = {
        city: faker.address.city(),
        name: faker.commerce.productName()
      };

      const extraVenue = () => {
        return createVenue(venueDetails);
      };

      return establishSpecResources(extraVenue)
        .then((venues) => {
          venue = venues[venues.length - 1];

          mockEvents = [{
            frequency: 'one time',
            startDate: faker.date.future(),
            startTime: '9:00 pm',
            title: faker.commerce.productName()
          }];

          siteRun = this.sandbox.stub().returns(Promise.resolve(mockEvents));
          this.sandbox.stub(mailgun, 'sendEmail');

          mockSite = {
            run: siteRun,
            url: faker.internet.url(),
            venueDetails
          };

          promise = new Promise((resolve, reject) => {
            siteScraper.scrape(
              mockSite,
              null,
              '<html></html>',
              resolve,
              reject
            );
          });
        });
    });

    it('returns an array of events based upon the site', function() {
      return promise
        .then((events) => {
          expect(events).to.deep.eq(mockEvents);
          const eventVenue = siteRun.firstCall.args[1];
          expect(eventVenue._id.toString()).to.eq(venue._id.toString());
        });
    });
  });
});
