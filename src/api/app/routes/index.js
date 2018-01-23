'use strict';

const adminEvents = require('./admin/events');
const adminInvitations = require('./admin/invitations');
const adminVenues = require('./admin/venues');
const bodyParser = require('body-parser');
const events = require('./events');
const express = require('express');
const users = require('./users');
const venues = require('./venues');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

// /api/admin/{route}
adminEvents(apiRouter);
adminInvitations(apiRouter);
adminVenues(apiRouter);

// /api/{route}
events(apiRouter);
users(apiRouter);
venues(apiRouter);

module.exports = apiRouter;
