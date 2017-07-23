'use strict';

const mongoose = require('mongoose');
const Event = require('../models/event');
const destroyDocument = require('../../lib/utils/destroyDocument');
const saveDocument = require('../../lib/utils/saveDocument');

function create(req, res, next) {
  const params = req.body;
  params.venue = mongoose.Types.ObjectId(req.body.venue); // eslint-disable-line new-cap

  return saveDocument(Event, params, res, next);
}

function destroy(req, res, next) {
  return destroyDocument(Event, req.params.id, res, next);
}

function index(req, res) {
  Event
    .find({})
    .populate('venue')
    .sort('startDate')
    .then((events) => res.json({ events }));
}

module.exports = {
  create,
  destroy,
  index
};
