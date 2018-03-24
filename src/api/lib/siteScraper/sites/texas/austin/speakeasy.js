'use strict';

const compact = require('lodash/compact');
const url = 'http://speakeasyaustin.com/';

function speakeasy($, venue) {
  const micNights = $("span:contains('Open Mic Night With Ronnie Hall')");

  const events = micNights.map((i, micNight) => {
    const timeAndDateContainer = $(micNight)
      .parent('.evcal_desc')
      .siblings('.evcal_cblock')
      .first();

    const startDay = timeAndDateContainer.find('.date').text();
    const startMonth = timeAndDateContainer.find('.month').text();
    const startYear = $('#evcal_cur').text().split(', ')[1];
    const startTime = timeAndDateContainer.find('.time').text();
    const startDate = `${startMonth} ${startDay} ${startYear}`;

    if (!startDay) { return null; }

    return {
      startDate,
      startTime,
      title: 'Open Mic Night With Ronnie Hall',
      venue: venue._id
    };
  }).toArray();

  return compact(events);
}

module.exports = {
  run: speakeasy,
  url,
  venueDetails: {
    city: 'Austin',
    name: 'Speakeasy'
  }
};
