'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();
const apiRouter = require('../app/routes');
const pathfinderUI = require('pathfinder-ui');

require('../config/initializers/database');

app.use(logger('dev', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'production') {
  app.use('/pathfinder', (req, res, next) => {
    pathfinderUI(app);
    next();
  }, pathfinderUI.router);
}

module.exports = app;
