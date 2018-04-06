'use strict';

const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Ego\'s', city: 'Austin' })
    .then((venue) => {
      const karaokeNights = [];

      for (let i = 1; i <= 7; i++) {
        karaokeNights.push({
          ageRestriction: true,
          frequency: 'weekly',
          startDate: moment().isoWeekday(i).format('MM-DD-YYYY'),
          startTime: '9:00pm',
          title: 'Karaoke',
          venue: venue._id
        });
      }

      return karaokeNights;
    });
}

module.exports = events();
