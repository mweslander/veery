'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://bigguncharleston.com/';

function bigGunBurger($, venue) {
  searchForOpenMicNights('Night Karaoke', $, 'p');

  return [
    {
      ...buildWeekly(1, venue),
      ageRestriction: false,
      cover: true,
      startTime: '9:30pm',
      title: 'Monday Night Karaoke'
    }
  ];
}

module.exports = {
  run: bigGunBurger,
  url,
  venueDetails: {
    city: 'Charleston',
    name: 'Big Gun Burger Shop & Bar'
  }
};
