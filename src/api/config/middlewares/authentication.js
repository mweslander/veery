'use strict';

const passport = require('../passport');

function loggedIn(req, res, done) {
  if (req.user) {
    return done();
  }

  return done(res.status(401), false);
}

module.exports = {
  requireLoggedInUser: loggedIn,
  requireSignIn: passport.authenticate('local')
};
