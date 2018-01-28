'use strict';

const adminEvents = require('./admin/events');
const adminInvitations = require('./admin/invitations');
const adminVenues = require('./admin/venues');

const events = require('./events');
const invitations = require('./invitations');
const users = require('./users');
const venues = require('./venues');

const bodyParser = require('body-parser');
const express = require('express');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

// /api/admin/{route}
adminEvents(apiRouter);
adminInvitations(apiRouter);
adminVenues(apiRouter);

// /api/{route}
events(apiRouter);
invitations(apiRouter);
users(apiRouter);
venues(apiRouter);

module.exports = apiRouter;
