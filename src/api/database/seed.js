'use strict';

const database = require('./index.js');
const seedEvents = require('./seeds/events'); // eslint-disable-line no-unused-vars
const seedUsers = require('./seeds/users');
const seedVenues = require('./seeds/venues'); // eslint-disable-line no-unused-vars
const utils = require('../lib/utils');

const seeder = {
  run() {
    return seedUsers()
      // .then(() => seedVenues())
      // .then(() => seedEvents())
      .then(() => utils.log('DATABASE SEEDED'))
      .catch((err) => {
        throw new Error(err.message);
      });
  }
};

database.runSingleAction(seeder.run);
