'use strict';

const buildDaily = require('../../../../../utils/eventObjects/buildDaily');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');

const url = 'http://www.parkcenterlounge.com/calendar/';

function parkCenterLounge($, venue) {
  searchForOpenMicNights('7:00 pm', $, 'span');

  return [
    {
      ...buildDaily(venue),
      startTime: '7:00 pm',
      title: 'Karaoke'
    }
  ];
}

module.exports = {
  run: parkCenterLounge,
  url,
  venueDetails: {
    city: 'Denver',
    name: 'Park Center Lounge'
  }
};
