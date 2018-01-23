'use strict';

const createAndSendInvitation = require('../../../utils/createAndSendInvitation');
const destroyDocument = require('../../../utils/destroyDocument');
const saveDocuments = require('../../../utils/saveDocuments');

const Event = require('../../models/event');
const Venue = require('../../models/venue');

function create(req, res, next) {
  const params = req.body;
  const newVenueAdmins = params.newVenueAdmins;
  const venueAdmins = params.venueAdmins || [];

  if (req.user.role === 'venueAdmin') {
    venueAdmins.push(req.user._id);
    params.venueAdmins = venueAdmins;
  }

  const promises = [new Venue(params).save()];

  if (newVenueAdmins) {
    newVenueAdmins.forEach((email) => {
      const invitationDetails = {
        email,
        role: 'venueAdmin'
      };

      promises.push(createAndSendInvitation(invitationDetails, res));
    });
  }

  return saveDocuments(promises, res, next);
}

function destroy(req, res, next) {
  const venue = res.locals.venue;

  return Event.remove({ venue: venue.id })
    .then(() => {
      return destroyDocument(venue, res, next);
    })
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function showAll(req, res, next) {
  let options = {};

  if (req.user.role === 'venueAdmin') {
    options = { venueAdmins: { $in: [req.user._id] } };
  }

  return Venue
    .find(options)
    .sort('name')
    .then((venues) => res.json({ venues }))
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function update(req, res, next) {
  let optionalParams;

  if (req.body.venueAdmins) {
    optionalParams = Object.assign({}, req.body, { $push: { venueAdmins: { $each: req.body.venueAdmins } } });
    delete optionalParams.venueAdmins;
  }

  return res.locals.venue
    .update(optionalParams || req.body)
    .then(() => res.status(202).send())
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

module.exports = {
  create,
  destroy,
  showAll,
  update
};
