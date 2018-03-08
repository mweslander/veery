'use strict';

const _ = require('lodash');
const url = 'https://bdrileys.com/sixthstreet/calendar/';
const Venue = require('../../../../../app/models/venue');

function bDRileys($) {
  const micNights = $("a:contains('Open Mic Night - ')");

  const events = (venue) => {
    return micNights.map((i, micNight) => {
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
  };

  return Venue
    .findOne({ name: 'B.D. Riley\'s Irish Pub and Restaurant', city: 'Austin' })
    .then((venue) => _.compact(events(venue)));
}

module.exports = {
  run: bDRileys,
  url
};
