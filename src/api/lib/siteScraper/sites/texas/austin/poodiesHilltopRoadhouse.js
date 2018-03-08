'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.poodies.net/';
const Venue = require('../../../../../app/models/venue');

function poodiesHilltopRoadhouse($) {
  const events = (venue) => {
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
  };

  return Venue
    .findOne({ name: 'Poodies Hilltop Roadhouse', city: 'Spicewood' })
    .then((venue) => events(venue));
}

module.exports = {
  run: poodiesHilltopRoadhouse,
  url
};
