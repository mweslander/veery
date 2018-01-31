'use strict';

const Invitation = require('../models/invitation');
const User = require('../models/user');

function isSignedIn(req, res) {
  res.status(200).json({ user: req.user });
}

function register(req, res) {
  let invitation;
  const password = req.body.password;

  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
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
      res.status(201).json({ user });
      return invitation.remove();
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
  isSignedIn,
  register,
  showAll,
  signIn,
  signOut
};
