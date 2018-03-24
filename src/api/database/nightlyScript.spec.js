'use strict';

const flattenDeep = require('lodash/flattenDeep');
const sinon = require('sinon');

const database = require('./index.js');
const mailgun = require('../config/mailgun');
const populator = require('../lib/populator');
const siteScraper = require('../lib/siteScraper');
const seedVenues = require('./seeds/venues');

const Event = require('../app/models/event');
const Venue = require('../app/models/venue');
const {
  createEvent
} = require('../../../support/spec/specHelper');

function establishSpecResources() {
  let venues = [];

  const promises = flattenDeep(seedVenues).map((venue) => {
    return new Venue(venue).save();
  });

  return Promise.all(promises)
    .then((createdVenues) => {
      venues = createdVenues;

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
    .then(() => venues);
}

describe('nightlyScript', function() {
  let buildAllEventPromises;
  let promise;
  let removeScrapedEvents;
  let run;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    return establishSpecResources()
      .then((venues) => {
        const mockEvent = {
          frequency: 'one time',
          startDate: faker.date.future(),
          startTime: '9:00 pm',
          title: faker.commerce.productName(),
          venue: venues[0]._id
        };

        this.sandbox.stub(database, 'drop').returns(Promise.resolve());
        this.sandbox.stub(database, 'runSingleAction');
        this.sandbox.stub(mailgun, 'sendEmail');

        run = this.sandbox.stub(siteScraper, 'run').returns([Promise.resolve(mockEvent)]);
        removeScrapedEvents = this.sandbox.stub(populator, 'removeScrapedEvents').returns(Promise.resolve());
        buildAllEventPromises = this.sandbox.stub(populator, 'buildAllEventPromises').returns([Promise.resolve()]);

        promise = require('./nightlyScript');
      });
  });

  afterEach(function() {
    this.sandbox.restore();
    return Promise.all([
      Event.remove(),
      Venue.remove()
    ]);
  });

  it('removes the previously scraped events after building the event promises and before saving the new ones', function() {
    // TODO: call the function in the beforeEach
    return promise()
      .then(() => {
        return sinon.assert.callOrder(run, removeScrapedEvents, buildAllEventPromises);
      });
  });
});
