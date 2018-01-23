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

// normal function here because arrow function is messing with `this`
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
