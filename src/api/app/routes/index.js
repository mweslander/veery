'use strict';

const bodyParser = require('body-parser');
const events = require('./events');
const express = require('express');
const users = require('./users');
const venues = require('./venues');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());
events(apiRouter);
users(apiRouter);
venues(apiRouter);

module.exports = apiRouter;
