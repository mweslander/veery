'use strict';

const _ = require('lodash');
const User = require('../../app/models/user');

function ensureVenueAccessibility(res, done, { user, venues }) {
  // To ensure we have the most accurate attributes on the user
  return User
    .findById(user && user._id)
    .then((_user) => {
      const stringedVenues = _user.venues.map((v) => v.toString());
      const inaccessibleVenues = venues.filter((venue) => {
        return !_.includes(stringedVenues, venue);
      });

      const userCantAccessVenue = _user.role !== 'admin' && inaccessibleVenues.length > 0;

      if (userCantAccessVenue) {
        return done(res.status(401).send(), false);
      }

      return done(null);
    })
    // if a user is being searched for, then that's bc there were
    // venues attached. So if it isn't found, that means that the
    // user, whom is non existent, can't modify those venue(s)
    .catch(() => done(res.status(401).send(), false));
}

function ensureAccessibility(req, res, done) {
  const { body: { role, venues }, user } = req;

  if (user && user.role === 'admin') {
    return done(null);
  }

  if (role === 'admin') {
    return done(res.status(401).send(), false);
  }

  if (!venues || venues.length === 0) {
    return done(null);
  }

  return ensureVenueAccessibility(res, done, { user, venues });
}

module.exports = {
  ensureAccessibility
};
