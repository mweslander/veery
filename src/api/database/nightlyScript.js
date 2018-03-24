'use strict';

const flatten = require('lodash/flatten');

const database = require('./index.js');
const populator = require('../lib/populator');
const siteScraper = require('../lib/siteScraper');

function nightlyScript() {
  const sites = flatten([require('./seeds/events'), siteScraper.run()]);

  return populator.addMicNights(sites, 'NIGHTLY SCRIPT FINISHED')
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(nightlyScript);

module.exports = nightlyScript;
