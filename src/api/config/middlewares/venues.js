'use strict';

const _ = require('lodash');
const Venue = require('../../app/models/venue');

function findAccessibleVenue(req, res, done) {
  return Venue
    .findById(req.params.id || req.body.venue)
    .then((venue) => {
      // Handling it this way bc base JavaScript should be faster than
      // querying the db with `populate`
      const venueAdmins = venue.venueAdmins.map((admin) => admin.toString());
      const userCantAccessVenue = req.user.role !== 'admin' && !_.includes(venueAdmins, req.user._id);

      if (userCantAccessVenue) {
        return done(res.status(403), false);
      }

      res.locals.venue = venue;
      return done(null);
    })
    .catch(done);
}

module.exports = {
  findAccessibleVenue
};
