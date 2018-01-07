'use strict';

const moment = require('moment');

// startDate isn't going to appear bc Pinhook is not currently doing open mic nights
const events = [
  {
    frequency: 'monthly',
    startDate: '08-02-14',
    startTime: '8:00pm - 11:00pm',
    title: 'PUNCHLINE OPEN MIC',
    type: 'open'
  }
];

const venue = {
  address: '115 W Main St',
  city: 'Durham',
  latitude: 35.995280,
  longitude: -78.901512,
  name: 'The Pinhook',
  state: 'NC',
  zipCode: 27701
};

module.exports = {
  events,
  venue
}
