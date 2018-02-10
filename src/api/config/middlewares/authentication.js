'use strict';

const passport = require('../passport');

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
