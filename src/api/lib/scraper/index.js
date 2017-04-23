'use strict';

const database = require('../../database');
const sites = require('./sites');
const utils = require('../../lib/utils');
const saveEventsAndVenue = require('../../lib/utils/saveEventsAndVenue');

const scraper = {
  run() {
    return Promise
      .all(sites)
      .then((eventsAndVenues) => scraper.save(eventsAndVenues))
      .then(() => utils.log('SCRAPE SUCCESSFULLY FINISHED'))
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  save(eventsAndVenues) {
    const promises = eventsAndVenues.map(({ events, venue }) => {
      return saveEventsAndVenue(events, venue);
    });

    return Promise.all(promises);
  }
};

database.runSingleAction(scraper.run);
