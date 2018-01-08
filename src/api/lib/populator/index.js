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
        // no longer throwing here because on fail, I don't need to the whole operation to stop
        log(err.message);
      });
  },

  saveMicNights(eventsAndVenues) {
    const filteredArray = eventsAndVenues.filter(foo => foo);

    const promises = filteredArray.map(({ events, venue }) => {
      return saveEventsAndVenue(events, venue);
    });

    return Promise.all(promises);
  }
};

module.exports = populator;
