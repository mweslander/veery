'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../utils/searchForOpenMicNights');
const url = 'http://www.fallsrivermusic.com/';

function fallsRiverMusic($) {
  searchForOpenMicNights('Every WEDNESDAY Night 8pm – 10pm', $, 'p');

  const events = [{
    frequency: 'weekly',
    startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
    startTime: '8 - 10pm',
    title: 'OPEN-MIC NIGHT',
    type: 'open'
  }];

  const venue = {
    name: 'Falls River Music',
    address: '10930 Raven Ridge Rd',
    city: 'Raleigh',
    state: 'NC',
    zipCode: 27614,
    latitude: 35.907351,
    longitude: -78.590152
  };

  return {
    events,
    venue
  };
}

module.exports = {
  run: fallsRiverMusic,
  url
};
