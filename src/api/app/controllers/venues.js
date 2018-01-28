'use strict';

const Venue = require('../models/venue');

function showAll(req, res) {
  return Venue
    .find({})
    .sort('event.start')
    .then((venues) => res.json({ venues }));
}

module.exports = {
  showAll
};
