'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  address: String,
  city: String,
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  latitude: Number,
  longitude: Number,
  name: String,
  state: String,
  zipCode: Number
});

module.exports = mongoose.model('Venue', venueSchema);
