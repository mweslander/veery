'use strict';

const moment = require('moment');

let iterationImpact = 1;
const days = {
  ['monday']: 1,
  ['tuesday']: 2,
  ['wednesday']: 3,
  ['thursday']: 4,
  ['friday']: 5
};

function determineDay(day, i) {
  if (moment().isoWeekday() <= day && iterationImpact === 1) {
    iterationImpact = 0;
    return moment().isoWeekday(day);
  }

  return moment()
    .add(i, 'weeks')
    .isoWeekday(day);
}

function createWeeklyDates(micNightDay) {
  const dates = [];
  const day = days[micNightDay];

  for (let i = 0; i <= 3; i++) {
    dates.push(determineDay(day, i + iterationImpact));
  }

  return dates;
}

module.exports = createWeeklyDates;
