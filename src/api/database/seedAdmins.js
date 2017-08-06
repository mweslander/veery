'use strict';

const admins = require('./seeds/admins');
const database = require('./index.js');
const User = require('../app/models/user.js');
const log = require('../utils/log');

function seedAdmins() {
  return new User(admins[0]).save()
    .then(() => log('ADMINS SUCCESSFULLY ADDED'))
    .catch((err) => {
      throw new Error(err.message);
    });
}

database.runSingleAction(seedAdmins);
