'use strict';

const _ = require('lodash');

const venuesMiddleware = require('./venues');
const Event = require('../../app/models/event');
const Venue = require('../../app/models/venue');

function findAccessibleEvent(req, res, done) {
  let event;

  return Event
    .findById(req.params.id)
    .then((foundEvent) => {
      event = foundEvent;
      return Venue.findById(event.venue);
    })
    .then((venue) => {
      venuesMiddleware.checkAdminAccess(venue, req, res, done);
      res.locals.event = event;
      return done(null);
    })
    .catch(done);
}

module.exports = {
  findAccessibleEvent
};
