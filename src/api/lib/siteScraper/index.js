'use strict';

const cheerio = require('cheerio');
const emailJordanAboutHisBadScraper = require('../../utils/emailJordanAboutHisBadScraper');
const request = require('request');

const sites = [
  require('./sites/durham/blueNoteGrill'),
  require('./sites/durham/socialDurham'),
  require('./sites/raleigh/deepSouth')
];

function findEventsAndVenue(site, resolve, $) {
  try {
    const { events, venue } = site.run($);

    if (events.length < 1) {
      emailJordanAboutHisBadScraper(site, { stack: 'No events were found.' });
      // resolving because I just want this to return null so other sites
      // that are being scraped can get their events displayed
      resolve();
    } else {
      resolve({ events, venue });
    }
  } catch (e) {
    emailJordanAboutHisBadScraper(site, e);
    resolve();
  }
}

const siteScraper = {
  run() {
    return sites.map((site) => {
      return new Promise((resolve, reject) => {
        return request(site.url, (error, _, html) => {
          if (error) {
            reject(emailJordanAboutHisBadScraper(site, error));
          }

          const $ = cheerio.load(html);

          return findEventsAndVenue(site, resolve, $);
        });
      });
    });
  }
};

module.exports = siteScraper;
