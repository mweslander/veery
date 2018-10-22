'use strict';

const base = require('./base');
const development = require('./development');

module.exports = {
  ...development,
  database: {
    mongodbUri: base.database.mongodbUri || 'mongodb://localhost/veery_test'
  }
};

