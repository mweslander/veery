'use strict';

const log = require('../../utils/log');
const saveEventsAndVenue = require('../../utils/saveEventsAndVenue');

const populator = {
  addMicNights(sites, message) {
    return Promise
      .all(sites)
      .then((eventsAndVenues) => populator.saveMicNights(eventsAndVenues))
      .then(() => log(message))
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  saveMicNights(eventsAndVenues) {
    const promises = eventsAndVenues.map(({ events, venue }) => {
      return saveEventsAndVenue(events, venue);
    });

    return Promise.all(promises);
  }
};

module.exports = populator;