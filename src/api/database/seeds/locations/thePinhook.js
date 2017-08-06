'use strict';

const events = [
  {
    frequency: 'monthly',
    startDate: '08-02-17',
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
