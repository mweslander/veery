'use strict';

const moment = require('moment');

const buildWeekly = require('../../../utils/eventObjects/buildWeekly');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Bottle 501' })
    .then((venue) => {
      return [
        {
          ...buildWeekly(1, venue),
          startTime: '7 - 9:30pm',
          title: 'Open Mic Night',
          type: 'open',
        }
      ];
    });
}

module.exports = events();
