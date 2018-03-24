'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.poodies.net/';

function poodiesHilltopRoadhouse($, venue) {
  searchForOpenMicNights('Open Mic @8PM', $, 'i');

  return [
    {
      frequency: 'weekly',
      startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
      startTime: '8PM',
      title: 'Open Mic @8PM',
      venue: venue._id
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
