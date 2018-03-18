'use strict';

const googleMaps = require('../../../config/googleMaps');

const createAndSendInvitation = require('../../../utils/createAndSendInvitation');
const destroyDocument = require('../../../utils/destroyDocument');
const saveDocuments = require('../../../utils/saveDocuments');

const Event = require('../../models/event');
const Venue = require('../../models/venue');

function buildGeocodeAddress(params) {
  if (!params) { return; }
  return `${params.address}, ${params.city}, ${params.state}, ${params.zipCode}`;
}

function retrieveLatAndLng(params, venue) {
  const geocodeAddressFromParams = buildGeocodeAddress(params);
  const geocodeAddressFromVenue = buildGeocodeAddress(venue);

  if (geocodeAddressFromParams === geocodeAddressFromVenue) {
    return Promise.resolve({ lat: venue.latitude, lng: venue.longitude });
  }

  return googleMaps.geocode(geocodeAddressFromParams);
}

function create(req, res, next) {
  const params = req.body;
  const newVenueAdmins = params.newVenueAdmins;
  const venueAdmins = params.venueAdmins || [];

  if (req.user.role === 'venueAdmin') {
    venueAdmins.push(req.user._id);
    params.venueAdmins = venueAdmins;
  }

  return retrieveLatAndLng(params)
    .then(({ lat, lng }) => {
      params.latitude = lat;
      params.longitude = lng;
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
    })
    .catch((error) => {
      console.log('Error:', error); // eslint-disable-line no-console
      return res.status(422).send({ error: 'You must enter a valid address.' });
    });
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
    .populate({
      path: 'events',
      options: { sort: 'startDate' }
    })
    .sort('name')
    .then((venues) => res.json({ venues }))
    .catch((err) => {
      console.log('Error:', err && err.message); // eslint-disable-line no-console
      next(err);
    });
}

function update(req, res, next) {
  let optionalParams = req.body;
  const venue = res.locals.venue;

  if (req.body.venueAdmins) {
    optionalParams = Object.assign({}, req.body, { $push: { venueAdmins: { $each: req.body.venueAdmins } } });
    delete optionalParams.venueAdmins;
  }

  return retrieveLatAndLng(optionalParams, venue)
    .then(({ lat, lng }) => {
      optionalParams.latitude = lat;
      optionalParams.longitude = lng;

      return venue
        .update(optionalParams)
        .then(() => res.status(202).send())
        .catch((err) => {
          console.log('Error:', err && err.message); // eslint-disable-line no-console
          next(err);
        });
    })
    .catch((error) => {
      console.log('Error:', error); // eslint-disable-line no-console
      next(error);
    });
}

module.exports = {
  create,
  destroy,
  showAll,
  update
};
