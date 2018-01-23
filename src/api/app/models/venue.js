'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

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
  venueAdmins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  zipCode: Number
});

venueSchema.pre('save', function(next) {
  const venue = this;

  if (venue.venueAdmins) {
    const options = { $push: { venues: venue._id } };
    return User.findByIdAndUpdate(venue.venueAdmins[0], options, next);
  }

  next();
});

module.exports = mongoose.model('Venue', venueSchema);
