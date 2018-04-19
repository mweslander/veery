'use strict';

const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Skewers Bar and Grill' })
    .then((venue) => {
      // This can now be scraped
      return [
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
          startTime: '10:00pm',
          title: 'Open Mic Night',
          type: 'open',
          venue: venue._id
        }
      ];
    });
}

module.exports = events();
