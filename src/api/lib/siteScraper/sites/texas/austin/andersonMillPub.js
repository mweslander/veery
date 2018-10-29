'use strict';

const moment = require('moment');

const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');

const url = 'http://www.andersonmillpub.com/';

function andersonMillPub($, venue) {
  // TODO: re-add this once they have karoake again
  // searchForOpenMicNights('Karaoke', $, 'span');
  searchForOpenMicNights('Open Mic on Wednesdays', $, 'span');
  searchForOpenMicNights('Open Mic Comedy on Thursdays', $, 'span');

  return [
    // {
    //   frequency: 'weekly',
    //   startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
    //   startTime: '8:00 pm',
    //   title: 'Karaoke Tuesdays',
    //   venue: venue._id
    // },
    {
      ...buildWeekly(3, venue),
      startTime: '8:00 pm',
      title: 'Open Mic on Wednesdays'
    },
    {
      frequency: 'weekly',
      startDate: moment().isoWeekday(4).format('MM-DD-YYYY'),
      startTime: '8:00 pm',
      title: 'Open Mic Comedy on Thursdays',
      venue: venue._id
    }
  ];
}

module.exports = {
  run: andersonMillPub,
  url,
  venueDetails: {
    city: 'Austin',
    name: 'Anderson Mill Pub'
  }
};
