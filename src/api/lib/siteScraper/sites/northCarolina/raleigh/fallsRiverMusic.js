'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.fallsrivermusic.com/';

function fallsRiverMusic($, venue) {
  searchForOpenMicNights('Every WEDNESDAY Night 8pm – 10pm', $, 'p');

  return [{
    frequency: 'weekly',
    startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
    startTime: '8 - 10pm',
    title: 'OPEN-MIC NIGHT',
    type: 'open',
    venue: venue._id
  }];
}

module.exports = {
  run: fallsRiverMusic,
  url,
  venueDetails: { name: 'Falls River Music' }
};
