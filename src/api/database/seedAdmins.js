'use strict';

const admins = require('./seeds/admins');
const database = require('./index.js');
const log = require('../utils/log');
const User = require('../app/models/user.js');
const venueAdmins = require('./seeds/venueAdmins');

function seedAdmins() {
  const promises = venueAdmins.map((admin) => {
    return new User(admin).save();
  });

  return Promise.all(promises)
    // .then(() => {
    //   return new User(admins[0]).save()
    // })
    .then(() => log('ADMINS SUCCESSFULLY ADDED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(seedAdmins);
