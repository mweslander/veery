'use strict';

const buildDaily = require('../../../../../utils/eventObjects/buildDaily');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');

const url = 'http://armidas-karaoke.com/';

function armidas($, venue) {
  searchForOpenMicNights('7 days a week 4:00pm-12:00am', $, 'p');

  return [
    {
      ...buildDaily(venue),
      startTime: '4pm - 12am',
      title: 'Karaoke'
    }
  ];
}

module.exports = {
  run: armidas,
  url,
  venueDetails: {
    city: 'Denver',
    name: 'Armida\'s'
  }
};
