'use strict';

// TODO: not really sure if they will ever make a comeback but for now,
// they stopped doing open mic nights

// const moment = require('moment');

// const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.fallsrivermusic.com/';

// function fallsRiverMusic($, venue) {
//   searchForOpenMicNights('Every WEDNESDAY Night @ 8pm', $, 'span');
//
//   return [{
//     frequency: 'weekly',
//     startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
//     startTime: '8 - 10pm',
//     title: 'OPEN-MIC NIGHT',
//     type: 'open',
//     venue: venue._id
//   }];
// }

module.exports = {
  // run: fallsRiverMusic,
  run: () => {},
  url,
  venueDetails: { name: 'Falls River Music' }
};
