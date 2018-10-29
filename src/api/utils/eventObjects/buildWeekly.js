'use strict';

const moment = require('moment');

function buildWeekly(dayNumber, venue) {
  return {
    frequency: 'weekly',
    startDate: moment().isoWeekday(dayNumber).format('MM-DD-YYYY'),
    venue: venue._id
  };
}

module.exports = buildWeekly;
