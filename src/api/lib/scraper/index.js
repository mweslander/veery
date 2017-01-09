'use strict';

const database = require('../../database');
const sites = require('./sites');
const utils = require('../../lib/utils');

const scraper = {
  run() {
    return Promise
      .all(sites)
      .then(() => utils.log('SCRAPE SUCCESSFULLY FINISHED'))
      .catch((err) => {
        throw new Error(err.message);
      });
  }
};

database.runSingleAction(scraper.run);
