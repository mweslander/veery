'use strict';

const _ = require('lodash');
const Event = require('../../app/models/event');
const Venue = require('../../app/models/venue');

function findAccessibleEvent(req, res, done) {
  return Event
    .findById(req.params.id)
    .then((event) => {
      return Venue
        .findById(event.venue)
        .then((venue) => {
          // Handling it this way bc base JavaScript should be faster than
          // querying the db with `populate`
          const venueAdmins = venue.venueAdmins.map((admin) => admin.toString());
          const userCantAccessVenue = req.user.role !== 'admin' && !_.includes(venueAdmins, req.user._id);

          if (userCantAccessVenue) {
            return done(res.status(403), false);
          }

          res.locals.event = event;
          return done(null);
        });
    })
    .catch(done);
}

module.exports = {
  findAccessibleEvent
};
