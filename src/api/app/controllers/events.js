'use strict';

const mongoose = require('mongoose');

const Event = require('../models/event');
const buildEventPromises = require('../../utils/buildEventPromises');
const destroyDocument = require('../../utils/destroyDocument');
const saveDocuments = require('../../utils/saveDocuments');

function create(req, res, next) {
  const params = req.body;
  params.venue = mongoose.Types.ObjectId(req.body.venue); // eslint-disable-line new-cap
  const promises = buildEventPromises(params);

  return saveDocuments(promises, res, next);
}

function destroy(req, res, next) {
  return destroyDocument(Event, req.params.id, res, next);
}

function index(req, res) {
  Event
    .find({
      startDate: { $gt: Date.now() - 86400000 }
    })
    .populate('venue')
    .sort('startDate')
    .then((events) => res.json({ events }));
}

module.exports = {
  create,
  destroy,
  index
};
