'use strict';

const database = require('./index.js');
const populator = require('../lib/populator');

function seedEvents() {
  return populator.addMicNights(require('./seeds/events'), 'EVENTS SUCCESSFULLY SEEDED')
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(seedEvents);
