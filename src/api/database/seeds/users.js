'use strict';

const User = require('../../app/models/user.js');

const user = {
  email: 'admin@example.com',
  password: 'password'
};

function seedUsers() {
  return new Promise((resolve, reject) => {
    new User(user).save((err) => {
      if (err) return reject(err);

      return resolve();
    })
  });
}

module.exports = seedUsers;
