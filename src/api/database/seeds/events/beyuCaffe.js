'use strict';

const moment = require('moment');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Beyú Caffe' })
    .then((venue) => {
      return [
        {
          cover: true,
          frequency: 'weekly',
          startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
          startTime: '8:00pm - 11:00pm',
          title: "Brett's OpenMic w/The Usual Suspects",
          type: 'open',
          venue: venue._id
        }
      ];
    });
}

module.exports = events();
