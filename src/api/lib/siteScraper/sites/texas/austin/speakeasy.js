'use strict';

const _ = require('lodash');
const url = 'http://speakeasyaustin.com/';
const Venue = require('../../../../../app/models/venue');

function speakeasy($) {
  const micNights = $("span:contains('Open Mic Night With Ronnie Hall')");

  const events = (venue) => {
    return micNights.map((i, micNight) => {
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
  };

  return Venue
    .findOne({ name: 'Speakeasy', city: 'Austin' })
    .then((venue) => _.compact(events(venue)));
}

module.exports = {
  run: speakeasy,
  url
};
