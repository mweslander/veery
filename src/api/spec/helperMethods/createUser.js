'use strict';

const User = require('../../app/models/user');

function buildUser(role) {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    role
  };
}

function createUser(role, options = {}) {
  const params = Object.assign({}, buildUser(role), options);

  return (new User(params)).save();
}

module.exports = createUser;
