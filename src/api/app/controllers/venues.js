'use strict';

const Venue = require('../models/venue');
const destroyDocument = require('../../lib/utils/destroyDocument');
const saveDocument = require('../../lib/utils/saveDocument');

function create(req, res, next) {
  return saveDocument(Venue, req.body, res, next);
}

function destroy(req, res, next) {
  return destroyDocument(Venue, req.params.id, res, next);
}

function index(req, res) {
  Venue
    .find({})
    .sort('event.start')
    .then((venues) => res.json({ venues }));
}

module.exports = {
  create,
  destroy,
  index
};
