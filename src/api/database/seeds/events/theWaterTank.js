'use strict';

const _ = require('lodash');
const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'The Water Tank', city: 'Austin' })
    .then((venue) => {
      return [
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
          startTime: '8pm - close',
          title: 'Karaoke',
          venue: venue._id
        },
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(4).format('MM-DD-YYYY'),
          startTime: '8pm - close',
          title: 'Karaoke',
          venue: venue._id
        },
        {
          frequency: 'weekly',
          startDate: moment().isoWeekday(5).format('MM-DD-YYYY'),
          startTime: '8pm - close',
          title: 'Karaoke',
          venue: venue._id
        },
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
