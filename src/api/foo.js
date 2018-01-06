'use strict';

const database = require('./database');
const log = require('./utils/log');

function test() {
  log('***********************');
  log('***********************');
  log('***********************');
  log('***********************');
}

database.runSingleAction(test);
