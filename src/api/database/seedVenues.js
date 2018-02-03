'use strict';

const venues = require('./seeds/venues');
const database = require('./index.js');
const log = require('../utils/log');
const Venue = require('../app/models/venue.js');

function seedVenues() {
  const promises = venues.map((venue) => {
    return new Venue(venue).save();
  });

  return Promise.all(promises)
    .then(() => log('VENUES SUCCESSFULLY ADDED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(seedVenues);
