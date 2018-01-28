'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('../../utils/bcrypt');

const userSchema = new Schema({
  email: {
    lowercase: true,
    require: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    default: 'venueAdmin',
    enum: ['admin', 'venueAdmin']
  },
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Venue'
    }
  ]
});

function hashPassword(user, next) {
  return bcrypt.hash(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch(next);
}

// normal function here because arrow function is messing with `this`
userSchema.pre('save', function(next) {
  const user = this;

  if (user.venues) {
    const options = { $push: { venueAdmins: user._id } };
    const Venue = require('./venue');
    const promises = [];

    user.venues.forEach((venue) => {
      promises.push(Venue.findByIdAndUpdate(venue, options));
    });

    return Promise.all(promises)
      .then(() => hashPassword(user, next))
      .catch((err) => {
        console.log('Error:', err && err.message); // eslint-disable-line no-console
        next(err);
      });
  }

  return hashPassword(user, next);
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
