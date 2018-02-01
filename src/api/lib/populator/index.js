'use strict';

const _ = require('lodash');

const buildEventPromises = require('../../utils/buildEventPromises');
const log = require('../../utils/log');
const Event = require('../../app/models/event');

const populator = {
  addMicNights(sites, message) {
    return Promise
      .all(sites)
      .then((events) => populator.renewMicNights(events))
      .then(() => log(message))
      .catch((err) => {
        // no longer throwing here because on fail, I don't need to the whole operation to stop
        log(err.message);
      });
  },

  renewMicNights(events) {
    const handsomeEvents = _.compact(_.flatten(events));
    const venueIds = handsomeEvents.map((event) => event.venue);

    return Event
      .remove({ venue: { $in: venueIds } })
      .then(() => {
        const promises = handsomeEvents.reduce((memo, event) => {
          if (event) { memo.push(buildEventPromises(event)); }
          return memo;
        }, []);

        return Promise.all(_.flatten(promises));
      });
  }
};

module.exports = populator;
