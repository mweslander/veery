'use strict';

const UsersController = require('../../controllers/users');

module.exports = function(api) {
  api.post('/register', UsersController.register);
};
