'use strict';

const cheerio = require('cheerio');
const emailJordanAboutHisBadScraper = require('../../utils/emailJordanAboutHisBadScraper');
const htmlparser = require('htmlparser2');
const request = require('request');

const sites = [
  require('./sites/apex/abbeyRoad'),
  require('./sites/cary/abbeyRoad'),
  require('./sites/durham/blueNoteGrill'),
  require('./sites/durham/socialDurham'),
  require('./sites/raleigh/deepSouth'),
  require('./sites/raleigh/fallsRiverMusic'),
  require('./sites/raleigh/gizmoBrewWorks')
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

function scrape(site, error, html, resolve, reject) {
  if (error) {
    return reject(emailJordanAboutHisBadScraper(site, error));
  }

  // htmlparser2 is what's used in the cheerio library
  if (!htmlparser.parseDOM(html)[0]) {
    const message = `${site.url} did not return any html`;
    console.log('html of bad site:', html);
    console.error(message);
    emailJordanAboutHisBadScraper(site, { stack: message });
    return resolve();
  }

  const $ = cheerio.load(html);

  return findEventsAndVenue(site, resolve, $);
}

const siteScraper = {
  run() {
    return sites.map((site) => {
      return new Promise((resolve, reject) => {
        const requestCallback = (error, _, html) => {
          return scrape(site, error, html, resolve, reject);
        };

        return request(site.url, requestCallback);
      });
    });
  }
};

module.exports = siteScraper;
