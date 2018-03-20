'use strict';

const sortedUniq = require('lodash/sortedUniq');

const Invitation = require('../app/models/invitation');
const User = require('../app/models/user');

const config = require('../config');
const mailgun = require('../config/mailgun');

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

function saveAndSendEmail(invitationObject, res, statusCode) {
  return invitationObject
    .save()
    .then((invitation) => {
      res.status(statusCode);
      return sendEmail(invitation);
    });
}

function createAndSendInvitation(invitationDetails, res) {
  const email = invitationDetails.email;

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(403);
        throw new Error(`A user with the email ${email} already exists.`);
      }

      return Invitation.findOne({ email });
    })
    .then((existingInvitation) => {
      if (existingInvitation) {
        const combinedVenues = existingInvitation.venues.concat([], invitationDetails.venues || []);
        existingInvitation.venues = sortedUniq(combinedVenues.map((v) => v.toString()));

        return saveAndSendEmail(existingInvitation, res, 202);
      }

      return saveAndSendEmail(new Invitation(invitationDetails), res, 201);
    });
}

module.exports = createAndSendInvitation;
