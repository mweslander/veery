'use strict';

const events = [
  {
    frequency: 'weekly',
    startDate: '08-02-17',
    startTime: '9:00pm',
    title: 'Open Mic Night',
    type: 'open'
  }
];

const venue = {
  address: '1013 W Main St',
  city: 'Durham',
  latitude: 36.001054,
  longitude: -78.911168,
  name: 'Skewers Bar and Grill',
  state: 'NC',
  zipCode: 27701
};

module.exports = {
  events,
  venue
}
