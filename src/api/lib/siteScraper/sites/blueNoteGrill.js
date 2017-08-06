'use strict';

const url = 'http://www.thebluenotegrill.com/events/';

function getMicNights($) {
  const blueJams = $('.event').filter((i, event) => {
    const title = $(event)
      .find('h2')
      .children('a')
      .text();

    return title
      .toLowerCase()
      .indexOf('blues jam') !== -1;
  });

  return blueJams.filter((i, blueJam) => {
    const dateTime = $(blueJam).find('.date-time');
    const startDate = dateTime
      .children('.event-date')
      .text();

    return new Date(startDate) > new Date();
  });
}

function blueNoteGrill($) {
  const micNights = getMicNights($);

  const events = micNights.map((i, micNight) => {
    const bluesJam = $(micNight);

    const title = bluesJam
      .find('h2')
      .children('a')
      .text();
    const dateTime = bluesJam.find('.date-time');
    const startDate = dateTime
      .children('.event-date')
      .text();
    const startTime = dateTime
      .children('.event-time')
      .text();

    return {
      startDate,
      startTime,
      title,
      type: 'open'
    };
  }).toArray();

  const venue = {
    name: 'Blue Note Grill',
    address: '709 Washington Street',
    city: 'Durham',
    state: 'NC',
    zipCode: 27704,
    latitude: 36.004379,
    longitude: -78.902946
  };

  return {
    events,
    venue
  };
}

module.exports = {
  run: blueNoteGrill,
  url
};
