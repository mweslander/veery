'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  frequency: {
    default: 'one time',
    enum: [
      'first of the month',
      'one time',
      'weekly'
    ],
    type: String
  },
  startDate: Date,
  startTime: String,
  title: String,
  type: String,
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue'
  }
});

eventSchema.pre('save', function(next) {
  const event = this;

  if (event.venue) {
    const options = { $push: { events: event._id } };
    const Venue = require('./venue');

    return Venue.findByIdAndUpdate(event.venue, options, next);
  }

  next();
});

module.exports = mongoose.model('Event', eventSchema);
