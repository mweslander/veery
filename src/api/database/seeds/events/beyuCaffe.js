'use strict';

const moment = require('moment');

const buildWeekly = require('../../../utils/eventObjects/buildWeekly');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Beyú Caffe' })
    .then((venue) => {
      return [
        {
          ...buildWeekly(3, venue),
          cover: true,
          startTime: '8:00pm - 11:00pm',
          title: "Brett's OpenMic w/The Usual Suspects",
          type: 'open',
        }
      ];
    });
}

module.exports = events();
