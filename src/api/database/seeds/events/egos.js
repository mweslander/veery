'use strict';

const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Ego\'s', city: 'Austin' })
    .then((venue) => {
      return [
        {
          ageRestriction: true,
          frequency: 'daily',
          startDate: moment().isoWeekday(i).format('MM-DD-YYYY'),
          startTime: '9:00pm',
          title: 'Karaoke',
          venue: venue._id
        }
      ];
    });
}

module.exports = events();
