'use strict';

const database = require('./index.js');
const seedVenues = require('./seeds/venues');
const utils = require('../lib/utils');

const seeder = {
  run() {
    return Promise
      .all([
        seedVenues()
      ])
      .then(() => utils.log('DATABASE SEEDED'))
      .catch((err) => {
        console.log('here');
        throw new Error(err.message);
      });
  }
};

database.runSingleAction(seeder.run);
