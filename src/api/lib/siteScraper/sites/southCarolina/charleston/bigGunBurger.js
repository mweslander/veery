'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://bigguncharleston.com/';

function bigGunBurger($, venue) {
  searchForOpenMicNights('Night Karaoke', $, 'p');

  return [
    {
      ageRestriction: false,
      cover: true,
      frequency: 'weekly',
      startDate: moment().isoWeekday(1).format('MM-DD-YYYY'),
      startTime: '9:30pm',
      title: 'Monday Night Karaoke',
      venue: venue._id
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
