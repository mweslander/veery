'use strict';

const mongoose = require('mongoose');
const Event = require('../../app/models/event');
const Venue = require('../../app/models/venue');

function saveEventsAndVenue(events, venue) {
  return new Promise((resolve, reject) => {
    let venueWithId;

    const eventSaveCallback = (event, i) => {
      event.venue = mongoose.Types.ObjectId(venueWithId._id); // eslint-disable-line new-cap
      new Event(event)
        .save((err) => {
          if (err) { reject(err.message); }
          if (i === events.length - 1) { resolve(); }
        });
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
