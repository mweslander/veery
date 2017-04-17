'use strict';

const faker = require('faker');
const moment = require('moment');
const Venue = require('../../app/models/venue.js');

const venues = [
  {
    "name": "58Fifty Bistro",
    "address": "5850 Fayetteville Road",
    "city": "Durham",
    "state": "NC",
    "zipCode": 27713,
    "latitude": 35.919938,
    "longitude": -78.930155,
    "frequency": "recurring"
  },
  {
    "name": "Blue Note Grill",
    "address": "709 Washington Street",
    "city": "Durham",
    "state": "NC",
    "zipCode": 27704,
    "latitude": 36.004379,
    "longitude": -78.902946,
    "frequency": "recurring"
  },
  {
    "name": "James Joyce",
    "address": "912 W Main St",
    "city": "Durham",
    "state": "NC",
    "zipCode": 27701,
    "latitude": 36.000698,
    "longitude": -78.909868,
    "frequency": "recurring"
  },
  {
    "name": "The Pinhook",
    "address": "117 W Main St",
    "city": "Durham",
    "state": "NC",
    "zipCode": 27701,
    "latitude": 35.995254,
    "longitude": -78.901501,
    "frequency": "recurring"
  },
  {
    "name": "The Social Gameroom",
    "address": "1007 W Main St",
    "city": "Durham",
    "state": "NC",
    "zipCode": 27701,
    "latitude": 36.000652,
    "longitude": -78.910782,
    "frequency": "recurring"
  }
]

function seedVenues() {
  return new Promise((resolve, reject) => {
    return venues.map((venue, i) => {
      new Venue(venue).save((err) => {
        if (err) reject(err);
        if (i === venues.length - 1) resolve();
      })
    });
  });
}

module.exports = seedVenues;
