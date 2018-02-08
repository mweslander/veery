'use strict';

const authentication = require('../../../config/middlewares/authentication');
const UsersController = require('../../controllers/users');

const forgotPassword = require('./forgotPassword');
const register = require('./register');
const resetPassword = require('./resetPassword');

module.exports = function(api) {
  api.get('/is-signed-in', authentication.requireLoggedInUser, UsersController.isSignedIn);
  api.get('/users', UsersController.showAll);
  api.post('/sign-in', authentication.requireSignIn, UsersController.signIn);
  api.get('/sign-out', authentication.requireLoggedInUser, UsersController.signOut);

  forgotPassword(api);
  register(api);
  resetPassword(api);
};
