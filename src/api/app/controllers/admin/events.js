'use strict';

const destroyDocument = require('../../../utils/destroyDocument');
const mongoose = require('mongoose');
const saveDocuments = require('../../../utils/saveDocuments');

const Event = require('../../models/event');
const User = require('../../models/user');

function create(req, res, next) {
  const params = req.body;
  params.venue = mongoose.Types.ObjectId(req.body.venue); // eslint-disable-line new-cap

  return saveDocuments([new Event(params).save()], res, next);
}

function destroy(req, res, next) {
  return destroyDocument(res.locals.event, res, next);
}

function respondWithEvents(res, next, options = {}) {
  // TODO: manually test the sorting
  return Event
    .find(options)
    .populate('venue')
    .sort('venue.name')
    .then((events) => res.json({ events }))
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function showAll(req, res, next) {
  if (req.user.role === 'venueAdmin') {
    // Theoretically req.user.venues should already have the venues I need to
    // make my query. However, I am consciously making the decision to not
    // completely explore this at the moment. While my hunch may be correct,
    // I don't want to spend multiple metal sessions implementing it just for
    // a very small performance improve by not running `User.findById`.
    return User
      .findById(req.user._id)
      .then((user) => {
        return respondWithEvents(res, next, { venue: { $in: user.venues } });
      });
  }

  return respondWithEvents(res, next);
}

module.exports = {
  create,
  destroy,
  showAll
};
