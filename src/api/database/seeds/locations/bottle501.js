'use strict';

const events = [
  {
    frequency: 'weekly',
    startDate: '08-07-17',
    startTime: '7 - 9:30pm',
    title: 'Open Mic Night',
    type: 'open'
  }
];

const venue = {
  address: '3219 Watkins Rd',
  city: 'Durham',
  latitude: 35.953073,
  longitude: -78.992012,
  name: 'Bottle 501',
  state: 'NC',
  zipCode: 27707
};

module.exports = {
  events,
  venue
}
