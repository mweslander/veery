'use strict';

const database = require('./index.js');
const locations = require('./seeds/locations');
const log = require('../utils/log');
const populator = require('../lib/populator');
const siteScraper = require('../lib/siteScraper');

function furnish() {
  return populator.addMicNights(locations, 'MANUAL LOCATIONS SUCCESSFULLY ADDED')
    .then(() => populator.addMicNights(siteScraper.run(), 'SCRAPE SUCCESSFULLY FINISHED'))
    .then(() => log('DATABASE FURNISHED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(furnish);
