'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.dudleysonann.com/facilities';

function dudleys($, venue) {
  searchForOpenMicNights('Karaoke 10pm', $, 'span');

  return [
    {
      ...buildWeekly(3, venue),
      startTime: '10:00pm',
      title: 'Karaoke'
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
