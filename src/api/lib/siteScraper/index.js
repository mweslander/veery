'use strict';

const cheerio = require('cheerio');
const request = require('request');

const sites = [
  require('./sites/blueNoteGrill'),
  require('./sites/socialDurham')
];

const siteScraper = {
  run() {
    return sites.map((site) => {
      return new Promise((resolve, reject) => {
        return request(site.url, (error, response, html) => {
          if (error) { reject(error.message); }

          const $ = cheerio.load(html);
          const { events, venue } = site.run($);

          resolve({ events, venue });
        });
      });
    });
  }
};

module.exports = siteScraper;
