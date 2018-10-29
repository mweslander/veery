'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const pathfinderUI = require('pathfinder-ui');
const session = require('express-session');

const config = require('./index.js');

const app = express();
const apiRouter = require('../app/routes');

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
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiRouter);
app.use((err, req, res, next) => {
  // This is for specific instances like a variable was not defined
  // and I was not receiving a helpful error message; just the generic
  // "Internal Server Error".
  if (err.stack && res.statusCode === 200) {
    console.error(err.stack); // eslint-disable-line no-console
  }

  next(res);
});

if (process.env.NODE_ENV !== 'production') {
  app.use('/pathfinder', (req, res, next) => {
    pathfinderUI(app);
    next();
  }, pathfinderUI.router);
}

if (process.env.NODE_ENV !== 'development') {
  const staticFilesPath = path.join(__dirname, '../../../dist');

  app.use(express.static(staticFilesPath));
  app.get('/', (req, res) => {
    res.sendFile(staticFilesPath);
  });
}

module.exports = app;
