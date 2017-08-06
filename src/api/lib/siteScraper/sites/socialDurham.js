'use strict';

const createWeeklyDates = require('../../../utils/createWeeklyDates');
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

function socialDurham($) {
  const micNight = getMicNight($);
  const micNightDay = micNight[0].toLowerCase();

  const startDates = createWeeklyDates(micNightDay);
  const startTime = micNight[1].split(' ')[0];

  const events = startDates.map((startDate) => {
    return {
      startDate,
      startTime,
      title: 'Song writers open mic',
      type: 'open'
    };
  });

  const venue = {
    name: 'Social Durham',
    address: '1007 W Main St',
    city: 'Durham',
    state: 'NC',
    zipCode: 27701,
    latitude: 36.000652,
    longitude: -78.910782
  };

  return {
    events,
    venue
  };
}

module.exports = {
  run: socialDurham,
  url
};
