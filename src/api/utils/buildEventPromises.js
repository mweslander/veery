'use strict';

const _ = require('lodash');
const moment = require('moment-holiday');
const Event = require('../app/models/event');

const holidays = moment().holidays([
  'New Years Day',
  'Martin Luther King Jr. Day',
  'Valentine\'s Day',
  'Easter Sunday',
  'Memorial Day',
  'Mother\'s Day',
  'Father\'s Day',
  'Independence Day',
  'Halloween',
  'Thanksgiving Day',
  'Day after Thanksgiving',
  'Christmas Eve',
  'Christmas Day',
  'New Year\'s Eve'
]);
const holidayValues = Object.values(holidays).map(h => h.valueOf());

function buildWeeklyStartDates(originalStartDate, amountOfWeeks = 4) {
  const startDates = [];
  startDates.push(moment(new Date(originalStartDate)));

  for (let i = 1; i < amountOfWeeks; i++) {
    startDates.push(moment(new Date(originalStartDate)).add(i, 'week'));
  }

  return startDates.filter((date) => {
    return !_.includes(holidayValues, date.valueOf());
  });
}

function buildWeeklyEvents(params) {
  const startDates = buildWeeklyStartDates(params.startDate, params.amountOfWeeks);

  return startDates.map((startDate) => {
    const eventAttributes = Object.assign({}, params, { startDate });
    return new Event(eventAttributes).save();
  });
}

function buildEventPromises(params) {
  switch (params.frequency) {
  case 'weekly':
    return buildWeeklyEvents(params);
  default:
    return [new Event(params).save()];
  }
}

module.exports = buildEventPromises;
