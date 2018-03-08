'use strict';

const createWeeklyDates = require('../../../../../utils/createWeeklyDates');
const url = 'http://socialdurham.com/events/';
const Venue = require('../../../../../app/models/venue');

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

function socialDurham($) {
  const micNight = getMicNight($);
  const micNightDay = micNight[0].toLowerCase();

  const startDates = createWeeklyDates(micNightDay);
  const startTime = micNight[1].split(' ')[0];

  const events = (venue) => {
    return startDates.map((startDate) => {
      return {
        startDate,
        startTime,
        title: 'Song writers open mic',
        type: 'open',
        venue: venue._id
      };
    });
  };

  return Venue
    .findOne({ name: 'Social Durham' })
    .then((venue) => events(venue));
}

module.exports = {
  run: socialDurham,
  url
};
