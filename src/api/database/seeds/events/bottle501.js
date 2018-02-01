'use strict';

const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Bottle 501' })
    .then((venue) => {
      return [
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(1).format('MM-DD-YYYY'),
          startTime: '7 - 9:30pm',
          title: 'Open Mic Night',
          type: 'open',
          venue: venue._id
        }
      ];
    });
}

module.exports = events();
