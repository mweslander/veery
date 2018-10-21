'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.poodies.net/';

function poodiesHilltopRoadhouse($, venue) {
  searchForOpenMicNights('Open Mic @8PM', $, 'i');

  return [
    {
      ...buildWeekly(3, venue),
      startTime: '8PM',
      title: 'Open Mic @8PM'
    }
  ];
}

module.exports = {
  run: poodiesHilltopRoadhouse,
  url,
  venueDetails: {
    city: 'Spicewood',
    name: 'Poodies Hilltop Roadhouse'
  }
};
