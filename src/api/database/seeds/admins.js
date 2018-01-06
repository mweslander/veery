'use strict';

const secrets = require('../../../../secrets.json');

const admins = [{
  email: 'admin@example.com',
  password: secrets.password
}];

module.exports = admins;
