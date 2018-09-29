'use strict';

const _ = require('lodash');
const moment = require('moment');
const Venue = require('../../../app/models/venue');

function buildKaraokeWeekdays(venue) {
  const weekdays = [];

  for (let i = 3; i < 6; i++) {
    weekdays.push({
      frequency: 'weekly',
      startDate: moment().isoWeekday(i).format('MM-DD-YYYY'),
      startTime: '8pm - close',
      title: 'Karaoke',
      venue: venue._id
    });
  }

  return weekdays;
}

function events() {
  return Venue
    .findOne({ name: 'The Water Tank', city: 'Austin' })
    .then((venue) => {
      const weekdays = buildKaraokeWeekdays(venue);

      return [
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
          startTime: '8pm - 11pm',
          title: 'Open Mic',
          venue: venue._id
        },
        ...weekdays,
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(6).format('MM-DD-YYYY'),
          startTime: '9pm - close',
          title: 'Karaoke',
          venue: venue._id
        },
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(7).format('MM-DD-YYYY'),
          startTime: '5:30pm - 9:30pm',
          title: 'Karaoke',
          venue: venue._id
        }
      ];
    });
}

module.exports = events();
