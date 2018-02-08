'use strict';

const UsersController = require('../../controllers/users');

module.exports = function(api) {
  api.get('/reset-password/:token', UsersController.resetPasswordRedirect);
  api.put('/reset-password/:token', UsersController.resetPassword);
};
