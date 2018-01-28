'use strict';

const app = require('../config/app');
const createEvent = require('./helperMethods/createEvent');
const createInvitation = require('./helperMethods/createInvitation');
const createUser = require('./helperMethods/createUser');
const createVenue = require('./helperMethods/createVenue');
const signInAndCreateUser = require('./helperMethods/signInAndCreateUser');
const shared = require('./shared');

const specHelper = {
  app,
  createEvent,
  createInvitation,
  createUser,
  createVenue,
  shared,
  signInAndCreateUser
};

module.exports = specHelper;
