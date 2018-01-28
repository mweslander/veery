'use strict';

const config = require('../../config');

const admins = [{
  email: 'admin@example.com',
  password: config.admin.password,
  role: 'admin'
}];

module.exports = admins;
