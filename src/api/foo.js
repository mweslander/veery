'use strict';

const database = require('./index.js');
const log = require('../utils/log');

function test() {
  log('***********************');
  log('***********************');
  log('***********************');
  log('***********************');
}

database.runSingleAction(test);
