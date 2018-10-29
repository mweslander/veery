'use strict';

const moment = require('moment');

const buildWeekly = require('../../../utils/eventObjects/buildWeekly');
const Venue = require('../../../app/models/venue');

function buildEvent(day, venue) {
  return {
    ...buildWeekly(day, venue),
    startTime: '10:00pm',
    title: 'Sexy Jesus Karaoke'
  };
}

function events() {
  return Venue
    .findOne({ name: 'Barracuda\'s', city: 'Denver' })
    .then((venue) => {
      return [
        buildEvent(2, venue),
        buildEvent(4, venue),
        buildEvent(5, venue),
        buildEvent(6, venue)
      ];
    });
}

module.exports = events();
