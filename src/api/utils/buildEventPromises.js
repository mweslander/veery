'use strict';

const moment = require('moment');
const Event = require('../app/models/event');

function buildWeeklyEvents(params) {
  const events = [];
  events.push(new Event(params).save());

  // 13 total weeks
  for (let i = 1; i <= 13; i++) {
    const lastDate = moment(new Date(params.startDate));
    params.startDate = lastDate.add(1, 'week');
    events.push(new Event(params).save());
  }

  return events;
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
