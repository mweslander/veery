'use strict';

const passport = require('passport');
const User = require('../../app/models/user');
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

// This is because idk the best way of testing a user being signed in. Not real code, really.
// It'll be gone soon.
function temporaryLogginChecks(req) {
  try {
    const user = req.user;
    const passportTest = req.session.passport;

    if (user || (passportTest && passportTest.user)) {
      const emailOne = user.email;
      const emailTwo = passportTest.user.email;

      if (emailOne !== emailTwo) {
        const errorMessage = 'In loggedIn method, the emails do not match. Reproduce this error asap.';
        console.log('$$$$$$$$$$$$$$$$$'); // eslint-disable-line no-console
        console.log(user); // eslint-disable-line no-console
        console.log(passportTest); // eslint-disable-line no-console
        throw new Error(errorMessage);
      }
    }
  } catch (e) {
    console.log('**********'); // eslint-disable-line no-console
    console.log('**********'); // eslint-disable-line no-console
    console.log(e.stack); // eslint-disable-line no-console
    console.log('**********'); // eslint-disable-line no-console
    console.log('**********'); // eslint-disable-line no-console
  }
}

function loggedIn(req, res, done) {
  temporaryLogginChecks(req);

  if (req.user) {
    return done();
  }

  return done(res.status(401), false);
}

module.exports = {
  requireLoggedInUser: loggedIn,
  requireSignIn: passport.authenticate('local')
};
