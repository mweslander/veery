'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'https://redgarter1962.com/karaoke/';

function redGarter($, venue) {
  searchForOpenMicNights('Al Red Garter il Karaoke', $, 'p');

  return [
    {
      frequency: 'daily',
      startDate: moment().format('MM-DD-YYYY'),
      startTime: '21:30',
      title: 'LIVE KARAOKE SHOW',
      venue: venue._id
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
