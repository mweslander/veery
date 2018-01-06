'use strict';

const admins = require('./seeds/admins');
const database = require('./index.js');
const locations = require('./seeds/locations');
const log = require('../utils/log');
const populator = require('../lib/populator');
const siteScraper = require('../lib/siteScraper');
const User = require('../app/models/user.js');

function furnish() {
  return database.drop()
    .then(() => {
      return populator.addMicNights(locations, 'MANUAL LOCATIONS SUCCESSFULLY ADDED');
    })
    .then(() => {
      return populator.addMicNights(siteScraper.run(), 'SCRAPE SUCCESSFULLY FINISHED');
    })
    .then(() => {
      return new User(admins[0]).save();
    })
    .then(() => log('ADMINS SUCCESSFULLY ADDED'))
    .then(() => log('DATABASE FURNISHED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(furnish);
