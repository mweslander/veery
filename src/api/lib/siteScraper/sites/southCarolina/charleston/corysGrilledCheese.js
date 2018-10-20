'use strict';

// TODO: Come back and up this once cory's has updated their site

// const moment = require('moment');

// const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.corysgrilledcheese.com/';

// function corysGrilledCheese($, venue) {
//   searchForOpenMicNights('Our weekly open mic night beginning at 6:30 PM', $, 'p');
//
//   return [
//     {
//       frequency: 'weekly',
//       startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
//       startTime: '6:30pm',
//       title: 'Weekly Open Mic Night',
//       venue: venue._id
//     }
//   ];
// }

module.exports = {
  // run: corysGrilledCheese,
  run: () => {},
  url,
  venueDetails: {
    city: 'Charleston',
    name: 'Cory\'s Grilled Cheese'
  }
};
