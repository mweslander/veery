'use strict';

const database = require('./index.js');
const log = require('../utils/log');
const populator = require('../lib/populator');
const siteScraper = require('../lib/siteScraper');

function furnish() {
  return populator.removeScrapedEvents()
    .then(() => {
      return populator.addMicNights(require('./seeds/events'), 'HARD CODED EVENTS SUCCESSFULLY ADDED');
    })
    .then(() => {
      return populator.addMicNights(siteScraper.run(), 'SCRAPE SUCCESSFULLY FINISHED');
    })
    .then(() => log('NIGHTLY SCRIPT FINISHED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(furnish);
