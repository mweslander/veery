'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.hardtailsbarandgrill.com/';
const Venue = require('../../../../../app/models/venue');

function hardtailsBarAndGrill($) {
  const events = (venue) => {
    searchForOpenMicNights('Tuesday nights from 7pm to 10pm', $, 'p');
    searchForOpenMicNights('Wednesdays starts at 8pm', $, 'p');

    return [
      {
        frequency: 'weekly',
        startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
        startTime: '7pm to 10pm',
        title: 'Open Mic Night',
        venue: venue._id
      },
      {
        frequency: 'weekly',
        startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
        startTime: '8pm',
        title: 'Karaoke',
        venue: venue._id
      }
    ];
  };

  return Venue
    .findOne({ name: 'Hardtails Bar and Grill', city: 'Georgetown' })
    .then((venue) => events(venue));
}

module.exports = {
  run: hardtailsBarAndGrill,
  url
};
