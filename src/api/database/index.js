'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const utils = require('../lib/utils');
const log = utils.log;
const isEnvironment = utils.isEnvironment;
const config = require('../config');

const database = {
  drop() {
    return new Promise((resolve, reject) => {
      if (isEnvironment(['production', 'preproduction'])) {
        reject(log('ERROR: production and preproduction databases cannot be dropped'));
      }

      mongoose.connection.dropDatabase(() => {
        resolve(log('DATABASE CLEANED'));
      });
    });
  },

  runSingleAction(action) {
    return database.connect()
      .then(() => {
        log('CONNECTION OPENED');
        return action();
      })
      .then(() => {
        return database.closeConnection();
      });
  },

  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.database.host, config.database.name);
      mongoose.connection
        .on('open', () => resolve())
        .on('error', (err) => reject(err.message));
    });
  },

  closeConnection() {
    mongoose.connection.close();
    log('CONNECTION CLOSED');
  }
};

module.exports = database;
