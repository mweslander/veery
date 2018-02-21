'use strict';

const crypto = require('crypto');

const config = require('../../config');
const mailgun = require('../../config/mailgun');

const Invitation = require('../models/invitation');
const User = require('../models/user');

function sendEmail(email, resetToken) {
  // For local testing, you'll need to add ':8080' after {config.domain}.
  const link = `http://${config.domain}/api/reset-password/${resetToken}`;
  const body = `Please visit the following link to reset your Veery password: \n ${link}`;

  return mailgun.sendEmail(
    email,
    'Veery Account Password Reset',
    body
  );
}

function setupPasswordReset(user, res, next) {
  return crypto.randomBytes(48, (_, buffer) => {
    const resetToken = buffer.toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    return user.save()
      .then((_user) => {
        return sendEmail(_user.email, resetToken);
      })
      .then(() => {
        return res.status(202).json({ message: `Forgot password email sent to ${user.email}.` });
      })
      .catch((err) => {
        console.log('Error:', err && err.message); // eslint-disable-line no-console
        next(err);
      });
  });
}

function forgotPassword(req, res, next) {
  const email = req.body.email;

  if (!email) {
    return res.status(422).send({ error: 'No email was attached.' });
  }

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: `Could not find user with email ${email}.` });
      }

      return setupPasswordReset(user, res, next);
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function isSignedIn(req, res) {
  return res.status(200).json({ user: req.user });
}

function validatePassword(password, passwordConfirmation) {
  if (!password) {
    return 'You must enter a password.';
  }

  if (password !== passwordConfirmation) {
    return 'The passwords must match.';
  }

  if (password.length < 6) {
    return 'The password must be 6 characters or more.';
  }
}

function register(req, res) {
  let invitation;
  const password = req.body.password;
  const passwordBasedError = validatePassword(password, req.body.passwordConfirmation);

  if (passwordBasedError) {
    return res.status(422).send({ error: passwordBasedError });
  }

  return Invitation
    .findById(req.body.invitationId)
    .then((foundInvitation) => {
      invitation = foundInvitation;

      const params =  {
        email: invitation.email,
        password,
        role: 'venueAdmin',
        venues: invitation.venues
      };

      return new User(params).save();
    })
    .then((user) => {
      return req.login(user, (err) => {
        if (err) { throw new Error(err); }

        res.status(201).json({ user });
        return invitation.remove();
      });
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      let errorMessage = err.message;
      const statusCode = err.statusCode || 404;

      if (statusCode === 404) {
        errorMessage = 'This invitation no longer exists.';
      }

      return res.status(statusCode).json({ error: errorMessage });
    });
}

function findUserForPasswordReset(token) {
  const options = {
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  };

  return User.findOne(options);
}

function updateAndSignInUser(user, password, req, res) {
  user.password = password;
  user.resetPasswordExpires = null;
  user.resetPasswordToken = null;

  return user.save()
    .then((_user) => {
      return req.login(user, (err) => {
        if (err) { throw new Error(err); }
        return res.status(202).json({ user: _user });
      });
    });
}

function resetPassword(req, res, next) {
  const password = req.body.password;
  const passwordBasedError = validatePassword(password, req.body.passwordConfirmation);

  if (passwordBasedError) {
    return res.status(422).send({ error: passwordBasedError });
  }

  return findUserForPasswordReset(req.params.token)
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: 'The reset password link has expired.' });
      }

      return updateAndSignInUser(user, password, req, res);
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function resetPasswordRedirect(req, res) {
  const token = req.params.token;
  const failureRedirect = `http://${config.domain}/#/admin/forgot-password?token=expired`;

  return findUserForPasswordReset(token)
    .then((user) => {
      if (!user) {
        return res.redirect(failureRedirect);
      }

      // For local testing, you'll need to add ':8080' after {config.domain}.
      return res.redirect(`http://${config.domain}/#/admin/reset-password?token=${token}`);
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      return res.redirect(failureRedirect);
    });
}

function showAll(req, res) {
  return User
    .find({})
    .sort('email')
    .then((users) => res.json({ users }));
}

function signIn(req, res) {
  const userInfo = {
    email: req.user.email
  };

  res.status(200).json(userInfo);
}

function signOut(req, res) {
  req.logout();
  res.status(200).send();
}

module.exports = {
  forgotPassword,
  isSignedIn,
  register,
  resetPassword,
  resetPasswordRedirect,
  showAll,
  signIn,
  signOut
};
