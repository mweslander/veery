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
    const User = require('./user');
    const promises = venue.venueAdmins.map((admin) => {
      return User.findByIdAndUpdate(admin, options);
    });

    return Promise.all(promises)
      .then(next)
      .catch((err) => {
        console.log('Error:', err && err.message); // eslint-disable-line no-console
        next(err);
      });
  }

  // TODO: remove the return if CI still fails
  return next();
});

module.exports = mongoose.model('Venue', venueSchema);
