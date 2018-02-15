'use strict';

const _ = require('lodash');

const buildEventPromises = require('../../utils/buildEventPromises');
const emailJordanAboutHisBadScraper = require('../../utils/emailJordanAboutHisBadScraper');
const log = require('../../utils/log');
const Event = require('../../app/models/event');
const Venue = require('../../app/models/venue');

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

  buildAllEventPromises(allEvents) {
    return allEvents.map((eventsArray) => {
      const promises = _.compact(eventsArray).reduce((memo, event) => {
        if (event) { memo.push(buildEventPromises(event)); }
        return memo;
      }, []);

      return Promise.all(_.flatten(promises))
        .then(events => events)
        .catch((e) => {
          return populator.notifyAboutFailure(e, eventsArray);
        });
    });
  },

  notifyAboutFailure(e, eventsArray) {
    return Venue
      .findById(_.compact(eventsArray)[0].venue)
      .then((venue) => {
        const site = {
          url: venue.name
        };
        return emailJordanAboutHisBadScraper(site, { stack: e });
      })
      .catch(() => {
        console.error(e); // eslint-disable-line no-console
        const stack = 'your error handling has failed you, beautiful.';
        return emailJordanAboutHisBadScraper({ url: 'unknown' }, { stack });
      });
  },

  renewMicNights(allEvents) {
    const handsomeEvents = _.compact(_.flatten(allEvents));
    const venueIds = handsomeEvents.map((event) => event.venue);

    return Event
      .remove({ venue: { $in: venueIds } })
      .then(() => {
        const promises = populator.buildAllEventPromises(allEvents);
        return Promise.all(_.flatten(promises));
      })
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
  }
};

module.exports = populator;
