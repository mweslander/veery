'use strict';

const moment = require('moment');

function buildDaily(venue) {
  return {
    frequency: 'daily',
    startDate: moment().format('MM-DD-YYYY'),
    venue: venue._id
  };
}

module.exports = buildDaily;
