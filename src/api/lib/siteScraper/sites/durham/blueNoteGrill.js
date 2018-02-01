'use strict';

const url = 'http://www.thebluenotegrill.com/events/';
const Venue = require('../../../../app/models/venue');

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

  const events = (venue) => {
    return micNights.map((i, micNight) => {
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
        type: 'open',
        venue: venue._id
      };
    }).toArray();
  };

  return Venue
    .findOne({ name: 'Blue Note Grill' })
    .then((venue) => events(venue));
}

module.exports = {
  run: blueNoteGrill,
  url
};
