'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');

const url = 'https://www.mozartsdenver.com/';

function mozarts($, venue) {
  searchForOpenMicNights('Thursday Karaoke', $, 'span');

  return [
    {
      ...buildWeekly(4, venue),
      startTime: '8pm',
      title: 'Thursday Karaoke'
    }
  ];
}

module.exports = {
  run: mozarts,
  url,
  venueDetails: {
    city: 'Denver',
    name: 'Mozart\'s'
  }
};
