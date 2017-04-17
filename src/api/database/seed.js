'use strict';

const database = require('./index.js');
const seedEvents = require('./seeds/events');
const seedVenues = require('./seeds/venues');
const utils = require('../lib/utils');

const seeder = {
  run() {
    return seedVenues()
      .then(() => seedEvents())
      .then(() => utils.log('DATABASE SEEDED'))
      .catch((err) => {
        throw new Error(err.message);
      });
  }
};

database.runSingleAction(seeder.run);
