'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://redgarteritaly.com/karaoke-firenze/';

function redGarter($, venue) {
  searchForOpenMicNights('21:30 till late LIVE KARAOKE SHOW', $, 'div');

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
