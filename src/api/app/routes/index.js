'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const apiRouter = express.Router(); // eslint-disable-line new-cap

apiRouter.use(bodyParser.urlencoded({ extended: false }));
apiRouter.use(bodyParser.json());

module.exports = apiRouter;
