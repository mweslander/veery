'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.hardtailsbarandgrill.com/';

function hardtailsBarAndGrill($, venue) {
  // NOTE. Tuesdays may make a comeback
  // searchForOpenMicNights('Tuesday nights from 7pm to 10pm', $, 'p');
  searchForOpenMicNights('Wednesdays starts at 8pm', $, 'p');

  return [
    // {
    //   frequency: 'weekly',
    //   startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
    //   startTime: '7pm to 10pm',
    //   title: 'Open Mic Night',
    //   venue: venue._id
    // },
    {
      frequency: 'weekly',
      startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
      startTime: '8pm',
      title: 'Karaoke',
      venue: venue._id
    }
  ];
}

module.exports = {
  run: hardtailsBarAndGrill,
  url,
  venueDetails: {
    city: 'Georgetown',
    name: 'Hardtails Bar and Grill'
  }
};
