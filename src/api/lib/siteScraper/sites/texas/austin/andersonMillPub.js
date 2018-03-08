'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://www.andersonmillpub.com/';
const Venue = require('../../../../../app/models/venue');

function andersonMillPub($) {
  const events = (venue) => {
    searchForOpenMicNights('Karaoke', $, 'span');
    searchForOpenMicNights('Open Mic on Wednesdays', $, 'span');
    searchForOpenMicNights('Open Mic Comedy on Thursdays', $, 'span');

    return [
      {
        frequency: 'weekly',
        startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
        startTime: '8:00 pm',
        title: 'Karaoke Tuesdays',
        venue: venue._id
      },
      {
        frequency: 'weekly',
        startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
        startTime: '8:00 pm',
        title: 'Open Mic on Wednesdays',
        venue: venue._id
      },
      {
        frequency: 'weekly',
        startDate: moment().isoWeekday(4).format('MM-DD-YYYY'),
        startTime: '8:00 pm',
        title: 'Open Mic Comedy on Thursdays',
        venue: venue._id
      }
    ];
  };

  return Venue
    .findOne({ name: 'Anderson Mill Pub', city: 'Austin' })
    .then((venue) => events(venue));
}

module.exports = {
  run: andersonMillPub,
  url
};