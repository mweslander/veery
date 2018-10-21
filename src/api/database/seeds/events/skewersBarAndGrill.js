'use strict';

const moment = require('moment');

const buildWeekly = require('../../../utils/eventObjects/buildWeekly');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Skewers Bar and Grill' })
    .then((venue) => {
      // This can now be scraped
      return [
        {
          ...buildWeekly(3, venue),
          startTime: '10:00pm',
          title: 'Open Mic Night',
          type: 'open',
        }
      ];
    });
}

module.exports = events();
