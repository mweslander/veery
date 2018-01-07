'use strict';

const moment = require('moment');

const events = [
  {
    frequency: 'weekly',
    startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
    startTime: '8:00pm - 11:00pm',
    title: "Brett's OpenMic w/The Usual Suspects",
    type: 'open'
  }
];

const venue = {
  address: '341 W Main St',
  city: 'Durham',
  latitude: 35.996665,
  longitude: -78.903873,
  name: 'Beyú Caffe',
  state: 'NC',
  zipCode: 27701
};

module.exports = {
  events,
  venue
}
