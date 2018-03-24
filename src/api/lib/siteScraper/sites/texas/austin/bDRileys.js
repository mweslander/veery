'use strict';

const compact = require('lodash/compact');
const url = 'https://bdrileys.com/sixthstreet/calendar/';

function bDRileys($, venue) {
  const micNights = $("a:contains('Open Mic Night - ')");

  const events = micNights.map((i, micNight) => {
    const href = $(micNight).attr('href');
    const timeAndDate = href.split('-monday-mic-')[1];
    const startDate = timeAndDate.split('pm-')[1];
    const startTime = timeAndDate.split('-')[0];

    if (!startTime) { return null; }

    return {
      startDate,
      startTime,
      title: 'Open Mic Night - \"Monday Mic\" at 7pm',
      venue: venue._id
    };
  }).toArray();

  return compact(events);
}

module.exports = {
  run: bDRileys,
  url,
  venueDetails: {
    city: 'Austin',
    name: 'B.D. Riley\'s Irish Pub and Restaurant'
  }
};
