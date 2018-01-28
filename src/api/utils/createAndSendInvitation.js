'use strict';

const config = require('../config');
const mailgun = require('../config/mailgun');

const Invitation = require('../app/models/invitation');
const User = require('../app/models/user');

function sendEmail(invitation) {
  // For local testing, you'll need to add ':8080' after {config.domain}.
  const link = `http://${config.domain}/api/invitations/${encodeURIComponent(invitation._id)}`;
  const body = `Please visit the following link to create your Veery account: \n ${link}`;

  return mailgun.sendEmail(
    invitation.email,
    'Veery Account Creation',
    body
  );
}

function createAndSendInvitation(invitationDetails, res) {
  const email = invitationDetails.email;

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(422);
        throw new Error(`A user with the email ${email} already exists`);
      }

      return Invitation.findOne({ email });
    })
    .then((existingInvitation) => {
      if (existingInvitation) {
        res.status(422);
        throw new Error(`An invitation for the user ${email} is still pending.`);
      }

      return new Invitation(invitationDetails).save();
    })
    .then((invitation) => {
      return sendEmail(invitation);
    });
}

module.exports = createAndSendInvitation;
