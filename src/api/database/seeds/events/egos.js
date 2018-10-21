'use strict';

const moment = require('moment');

const buildDaily = require('../../../utils/eventObjects/buildDaily');
const Venue = require('../../../app/models/venue');

function events() {
  return Venue
    .findOne({ name: 'Ego\'s', city: 'Austin' })
    .then((venue) => {
      return [
        {
          ...buildDaily(venue),
          ageRestriction: true,
          startTime: '9:00pm',
          title: 'Karaoke'
        }
      ];
    });
}

module.exports = events();
