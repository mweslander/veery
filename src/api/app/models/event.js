'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO come back and figure out if we need creator
const eventSchema = new Schema({
  _creator : {
    type: Number,
    ref: 'Venue'
  },
  startDate: Date,
  startTime: String,
  title: String
});

module.exports = mongoose.model('Event', eventSchema);
