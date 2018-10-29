'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('../config');
const isEnvironment = require('../utils/isEnvironment');
const log = require('../utils/log');

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
      })
      .catch((err) => {
        console.warn('\x1b[31m%s\x1b[0m', `Error: ${err.message}`); // eslint-disable-line
        return database.closeConnection();
      });
  },

  connect() {
    return new Promise((resolve, reject) => {
      const databaseName = config.database.mongodbUri;

      mongoose.connect(databaseName, {
        useMongoClient: true
      });
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
