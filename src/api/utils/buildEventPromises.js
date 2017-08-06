'use strict';

const moment = require('moment');

const Event = require('../app/models/event');

function buildWeeklyEvents(params) {
  const events = [];
  events.push(new Event(params).save());

  // 13 total weeks
  for (let i = 1; i <= 12; i++) {
    const lastDate = moment(new Date(params.startDate));
    params.startDate = lastDate.add(1, 'week');
    events.push(new Event(params).save());
  }

  return events;
}

function buildEventPromises(params) {
  let promises;

  switch (params.frequency) {
  case 'weekly':
    promises = buildWeeklyEvents(params);
    break;
  default:
    promises = [new Event(params).save()];
  }

  return promises;
}

module.exports = buildEventPromises;
