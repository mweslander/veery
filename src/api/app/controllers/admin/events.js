'use strict';

const mongoose = require('mongoose');

const buildEventPromises = require('../../../utils/buildEventPromises');
const destroyDocument = require('../../../utils/destroyDocument');
const saveDocuments = require('../../../utils/saveDocuments');

const Event = require('../../models/event');
const User = require('../../models/user');

function create(req, res, next) {
  const params = req.body;
  params.venue = mongoose.Types.ObjectId(req.body.venue); // eslint-disable-line new-cap
  const promises = buildEventPromises(params);

  return saveDocuments(promises, res, next);
}

// Using a callback bc this filter will become a conditional
// once we have more frequencies
function eventsFilterCallback(event) {
  return function(filterEvent) {
    return new Date(filterEvent.startDate).getDay() === new Date(event.startDate).getDay();
  };
}

function removeRecurringEvents(event, res, next) {
  return Event
    .find({ frequency: event.frequency, venue: event.venue })
    .then((events) => events.filter(eventsFilterCallback(event)))
    .then((events) => {
      return destroyDocument(Event, res, next, { _id: events.map(e => e._id) });
    });
}

function destroy(req, res, next) {
  const event = res.locals.event;

  if ([true, 'true'].indexOf(req.query.destroyAll) > -1) {
    return removeRecurringEvents(event, res, next);
  }

  return destroyDocument(event, res, next);
}

function respondWithEvents(res, next, options = {}) {
  return Event
    .find(options)
    .populate('venue')
    .sort('venue')
    .sort('startDate')
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
    // a very small performance improvement by not running `User.findById`.
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
