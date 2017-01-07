'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  address: String,
  city: String,
  event: {
    end: Date,
    start: Date,
    title: String
  },
  frequency: String,
  latitude: Number,
  longitude: Number,
  name: String,
  state: String,
  type: String,
  zipCode: Number
});

module.exports = mongoose.model('Venue', venueSchema);
