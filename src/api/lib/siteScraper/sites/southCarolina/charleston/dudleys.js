'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.dudleysonann.com/facilities';

function dudleys($, venue) {
  searchForOpenMicNights('Karaoke 10pm', $, 'span');

  return [
    {
      frequency: 'weekly',
      startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
      startTime: '10:00pm',
      title: 'Karaoke',
      venue: venue._id
    }
  ];
}

module.exports = {
  run: dudleys,
  url,
  venueDetails: {
    city: 'Charleston',
    name: 'Dudley\'s'
  }
};
