'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  email: {
    lowercase: true,
    require: true,
    type: String,
    unique: true
  },
  role: {
    type: String,
    default: 'venueAdmin',
    enum: ['admin', 'venueAdmin']
  },
  venues: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Invitation', invitationSchema);
