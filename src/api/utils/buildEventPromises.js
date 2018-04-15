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

function buildStartDates(amountOfWeeks = 2, forLoopCallback = () => {}) {
  const startDates = [];

  for (let i = 0; i < amountOfWeeks; i++) {
    forLoopCallback(startDates, i);
  }

  return startDates.filter((date) => {
    return !_.includes(holidayValues, date.valueOf());
  });
}

function buildEvents(params, forLoopCallback) {
  const startDates = buildStartDates(params.amountOfWeeks, forLoopCallback);

  return startDates.map((startDate) => {
    const eventAttributes = Object.assign({}, params, { startDate });
    return new Event(eventAttributes).save();
  });
}

function buildEventPromises(params) {
  let forLoopCallback = (startDates, i) => {
    startDates.push(moment(new Date(params.startDate)).add(i, 'week'));
  };

  switch (params.frequency) {
  case 'daily':
    forLoopCallback = (startDates, i) => {
      for (let ii = 0; ii < 7; ii++) {
        startDates.push(moment(new Date(params.startDate)).add(i, 'week').add(ii, 'day'));
      }
    };

    return buildEvents(params, forLoopCallback);
  case 'weekly':
    return buildEvents(params, forLoopCallback);
  default:
    return [new Event(params).save()];
  }
}

module.exports = buildEventPromises;
