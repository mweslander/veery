'use strict';

const Venue = require('../models/venue');

function index(req, res) {
  Venue
    .find({})
    .sort('event.start')
    .then((venues) => res.json({ venues }));
}

module.exports = {
  index
};
