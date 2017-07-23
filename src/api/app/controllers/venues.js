'use strict';

const Venue = require('../models/venue');
const destroyDocument = require('../../lib/utils/destroyDocument');
const saveDocuments = require('../../lib/utils/saveDocuments');

function create(req, res, next) {
  const promises = [new Venue(req.body).save()];
  return saveDocuments(promises, res, next);
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
