'use strict';

const buildDaily = require('../../../../../utils/eventObjects/buildDaily');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'https://redgarter1962.com/karaoke/';

function redGarter($, venue) {
  searchForOpenMicNights('Al Red Garter il Karaoke', $, 'p');

  return [
    {
      ...buildDaily(venue),
      startTime: '21:30',
      title: 'LIVE KARAOKE SHOW'
    }
  ];
}

module.exports = {
  run: redGarter,
  url,
  venueDetails: {
    city: 'Firenze FI',
    name: 'Red Garter'
  }
};
