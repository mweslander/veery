'use strict';

const utils = require('../utils');
const Populator = require('./populator.js');
const faker = require('faker');

const seeder = {
  run() {
    return utils.log('DATABASE SEEDED');
  },
};

module.exports = seeder;
