'use strict';

const Venue = require('../models/venue');

function showAll(req, res) {
  let options = {};

  if (req.query.latitudeMin) {
    const {
      latitudeMin,
      latitudeMax,
      longitudeMin,
      longitudeMax
    } = req.query;

    options = {
      latitude: {
        $gt: latitudeMin,
        $lt: latitudeMax
      },
      longitude: {
        $gt: longitudeMin,
        $lt: longitudeMax
      }
    };
  }

  return Venue
    .find(options)
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
