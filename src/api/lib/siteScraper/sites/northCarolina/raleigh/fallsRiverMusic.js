'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.fallsrivermusic.com/';
const Venue = require('../../../../../app/models/venue');

function fallsRiverMusic($) {
  return Venue
    .findOne({ name: 'Falls River Music' })
    .then((venue) => {
      searchForOpenMicNights('Every WEDNESDAY Night 8pm – 10pm', $, 'p');

      return [{
        frequency: 'weekly',
        startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
        startTime: '8 - 10pm',
        title: 'OPEN-MIC NIGHT',
        type: 'open',
        venue: venue._id
      }];
    });
}

module.exports = {
  run: fallsRiverMusic,
  url
};
