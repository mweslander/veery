'use strict';

const Venue = require('../models/venue');

function showAll(req, res) {
  return Venue
    .find({})
    .populate({
      path: 'events',
      match: {
        startDate: {
          $gt: Date.now() - 86400000
        }
      },
      populate: { path: 'venue' }
    })
    .then((venues) => res.json({ venues }));
}

module.exports = {
  showAll
};
