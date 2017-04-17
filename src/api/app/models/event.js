'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  venue : {
    type: Schema.Types.ObjectId,
    ref: 'Venue'
  },
  startDate: Date,
  startTime: String,
  title: String,
  type: String
});

module.exports = mongoose.model('Event', eventSchema);
