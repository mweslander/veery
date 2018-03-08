'use strict';

const url = 'https://www.brentwoodsocial.com/events-1/';
const Venue = require('../../../../../app/models/venue');

function brentwoodSocialHouse($) {
  const micNights = $(".item-title:contains('Open Mic Music Night')");

  const events = (venue) => {
    return micNights.map((i, micNight) => {
      const marker = $(micNight)
        .closest('ul')
        .prev();

      const day = marker
        .children('marker-daynum')
        .first()
        .text();

      const monthAndYear = $('.yui3-calendar-header-label').text();
      const startDate = `${day} ${monthAndYear}`;

      return [
        {
          startDate,
          startTime: '7p',
          title: 'Open Mic Music Night',
          venue: venue._id
        }
      ];
    });
  };

  return Venue
    .findOne({ name: 'Brentwood Social House', city: 'Austin' })
    .then((venue) => events(venue));
}

module.exports = {
  run: brentwoodSocialHouse,
  url
};
