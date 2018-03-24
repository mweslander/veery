'use strict';

const url = 'https://www.brentwoodsocial.com/events-1/';

function brentwoodSocialHouse($, venue) {
  const micNights = $(".item-title:contains('Open Mic Music Night')");

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
}

module.exports = {
  run: brentwoodSocialHouse,
  url,
  venueDetails: {
    city: 'Austin',
    name: 'Brentwood Social House'
  }
};
