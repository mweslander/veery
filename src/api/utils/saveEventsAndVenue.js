'use strict';

const mongoose = require('mongoose');

const buildEventPromises = require('./buildEventPromises');
const Venue = require('../app/models/venue');

function saveEventsAndVenue(events, venue) {
  return new Promise((resolve, reject) => {
    let venueWithId;

    const eventSaveCallback = (event, i) => {
      event.venue = mongoose.Types.ObjectId(venueWithId._id); // eslint-disable-line new-cap
      const promises = buildEventPromises(event);

      return Promise
        .all(promises)
        .then(() => {
          if (i === events.length - 1) { resolve(); }
        })
        .catch((err) => reject(err.message));
    };

    new Venue(venue)
      .save((err, savedVenue) => {
        if (err) { reject(err.message); }

        venueWithId = savedVenue;
        return events
          .forEach(eventSaveCallback);
      });
  });
}

module.exports = saveEventsAndVenue;
