'use strict';

const config = require('../../config');
const Invitation = require('../models/invitation');

function show(req, res) {
  return Invitation
    .findById(req.params.id)
    .then((invitation) => {
      // For local testing, you'll need to add ':8080' after {config.domain}.
      res.redirect(`http://${config.domain}/#/register?invitationId=${encodeURIComponent(invitation._id)}&email=${encodeURIComponent(invitation.email)}`);
    })
    .catch(() => {
      // For local testing, you'll need to add ':8080' after {config.domain}.
      res.redirect(`http://${config.domain}/#/register`);
    });
}

module.exports = {
  show
};
