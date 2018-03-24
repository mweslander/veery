'use strict';

const createWeeklyDates = require('../../../../../utils/createWeeklyDates');
const url = 'http://socialdurham.com/events/';

function getMicNight($) {
  return $('#text-3 .textwidget')
    .map((i, event) => {
      const title = $(event).text();
      return title;
    })
    .get()
    .find((title) => {
      return title
        .toLowerCase()
        .indexOf('open mic night') !== -1;
    })
    .split('\n');
}

function socialDurham($, venue) {
  const micNight = getMicNight($);
  const micNightDay = micNight[0].toLowerCase();

  const startDates = createWeeklyDates(micNightDay);
  const startTime = micNight[1].split(' ')[0];

  return startDates.map((startDate) => {
    return {
      startDate,
      startTime,
      title: 'Song writers open mic',
      type: 'open',
      venue: venue._id
    };
  });
}

module.exports = {
  run: socialDurham,
  url,
  venueDetails: { name: 'Social Durham' }
};
