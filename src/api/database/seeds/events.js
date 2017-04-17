'use strict';

const Event = require('../../app/models/event.js');
const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');
const sample = require('lodash/sample');
const times = require('lodash/times');
const Venue = require('../../app/models/venue.js');

const events = times(10, () => {
  const date = faker.date.future();
  const title = sample(['Open Mic', 'Blues Jam']);

  const startDate = new Date(date);
  const startTime = `${Math.ceil(Math.random() * 12)}:00 p.m.`;

  return {
    startDate,
    startTime,
    title,
    type: 'open'
  }
});

function seedEvents() {
  return new Promise((resolve, reject) => {
    return Venue
      .find({})
      .then((venues) => {
        return events.map((event, i) => {
          const venue = sample(venues);

          event.venue = mongoose.Types.ObjectId(venue._id);
          new Event(event).save((err) => {
            if (err) reject(err);
            if (i === events.length - 1) resolve();
          })
        });
      });
  });
}

module.exports = seedEvents;
