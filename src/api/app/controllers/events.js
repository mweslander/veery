'use strict';

const moment = require('moment');
const mongoose = require('mongoose');
const Event = require('../models/event');
const destroyDocument = require('../../lib/utils/destroyDocument');
const saveDocuments = require('../../lib/utils/saveDocuments');

function buildWeeklyEvents(params) {
  const promises = [];
  promises.push(new Event(params).save());

  // 13 total weeks
  for (let i = 1; i <= 12; i++) {
    const lastDate = moment(new Date(params.startDate));
    params.startDate = lastDate.add(1, 'week');
    promises.push(new Event(params).save());
  }

  return promises;
}

function create(req, res, next) {
  let promises;
  const params = req.body;
  params.venue = mongoose.Types.ObjectId(req.body.venue); // eslint-disable-line new-cap

  switch (params.frequency) {
  case 'weekly':
    promises = buildWeeklyEvents(params);
    break;
  default:
    promises = [new Event(params).save()];
  }

  return saveDocuments(promises, res, next);
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
