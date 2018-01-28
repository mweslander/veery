'use strict';

const Event = require('../models/event');

function showAll(req, res) {
  return Event
    .find({
      startDate: { $gt: Date.now() - 86400000 }
    })
    .populate('venue')
    .sort('startDate')
    .then((events) => res.json({ events }));
}

module.exports = {
  showAll
};
