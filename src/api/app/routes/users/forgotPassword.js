'use strict';

const UsersController = require('../../controllers/users');

module.exports = function(api) {
  api.post('/forgot-password', UsersController.forgotPassword);
};
