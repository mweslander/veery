'use strict';

const compact = require('lodash/compact');
const flatten = require('lodash/flatten');

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
        // no longer throwing here because on fail, I don't need the whole operation to stop
        log(err.message);
      });
  },

  buildAllEventPromises(allEvents) {
    return allEvents.map((eventsArray) => {
      const promises = compact(eventsArray).reduce((memo, event) => {
        if (event) {
          event.scraped = true;
          memo.push(buildEventPromises(event));
        }
        return memo;
      }, []);

      return Promise.all(flatten(promises))
        .then(events => events)
        .catch((e) => {
          return populator.notifyAboutFailure(e, eventsArray);
        });
    });
  },

  notifyAboutFailure(e, eventsArray) {
    return Venue
      .findById(compact(eventsArray)[0].venue)
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

  removeScrapedEvents() {
    return Event.remove({ scraped: true });
  },

  renewMicNights(allEvents) {
    return populator
      .removeScrapedEvents()
      .then(() => {
        const promises = populator.buildAllEventPromises(allEvents);
        return Promise.all(flatten(promises));
      })
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
      });
  }
};

module.exports = populator;
