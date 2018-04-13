'use strict';

const _ = require('lodash');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');
const request = require('request');

const emailJordanAboutHisBadScraper = require('../../utils/emailJordanAboutHisBadScraper');
const Venue = require('../../app/models/venue');

const sites = [
  require('./sites/italy'),
  require('./sites/northCarolina'),
  require('./sites/southCarolina'),
  require('./sites/texas')
];

const siteScraper = {
  buildEventsFromSite(site, resolve, $) {
    return Venue
      .findOne(site.venueDetails)
      .then((venue) => site.run($, venue))
      .then((events) => {
        if (events.length < 1) {
          emailJordanAboutHisBadScraper(site, { stack: 'No events were found.' });
          // resolving because I just want this to return null so other sites
          // that are being scraped can get their events displayed
          return resolve();
        }

        return resolve(events);
      })
      .catch((e) => {
        console.error(e); // eslint-disable-line no-console
        emailJordanAboutHisBadScraper(site, e);
        return resolve();
      });
  },

  run() {
    return _.flattenDeep(sites).map((site) => {
      return new Promise((resolve, reject) => {
        const requestCallback = (error, __, html) => {
          return siteScraper.scrape(site, error, html, resolve, reject);
        };

        return request(site.url, requestCallback);
      });
    });
  },

  scrape(site, error, html, resolve, reject) {
    if (error) {
      return reject(emailJordanAboutHisBadScraper(site, error));
    }

    // htmlparser2 is what's used in the cheerio library
    if (!htmlparser.parseDOM(html)[0]) {
      const message = `${site.url} did not return any html`;
      console.error(message); // eslint-disable-line no-console
      console.log('html of bad site:', html); // eslint-disable-line no-console
      emailJordanAboutHisBadScraper(site, { stack: `${message} \n ${html}` });
      return resolve();
    }

    const $ = cheerio.load(html);

    return siteScraper.buildEventsFromSite(site, resolve, $);
  }
};

module.exports = siteScraper;
