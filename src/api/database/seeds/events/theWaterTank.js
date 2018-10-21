'use strict';

const _ = require('lodash');
const moment = require('moment');

const buildWeekly = require('../../../utils/eventObjects/buildWeekly');
const Venue = require('../../../app/models/venue');

function buildKaraokeWeekdays(venue) {
  const weekdays = [];

  for (let i = 3; i < 6; i++) {
    weekdays.push({
      ...buildWeekly(i, venue),
      startTime: '8pm - close',
      title: 'Karaoke'
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
          ...buildWeekly(2, venue),
          startTime: '8pm - 11pm',
          title: 'Open Mic'
        },
        ...weekdays,
        {
          ...buildWeekly(6, venue),
          startTime: '9pm - close',
          title: 'Karaoke'
        },
        {
          ...buildWeekly(7, venue),
          startTime: '5:30pm - 9:30pm',
          title: 'Karaoke'
        }
      ];
    });
}

module.exports = events();
