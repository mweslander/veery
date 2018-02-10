'use strict';

const passport = require('passport');
const User = require('../app/models/user');
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localSignIn = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() })
    .then((user) => {
      if (!user) { return done(null, false); }

      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) { return done(null, false); }

          return done(null, user);
        });
    })
    .catch(done);
});

passport.use(localSignIn);

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

module.exports = passport;
