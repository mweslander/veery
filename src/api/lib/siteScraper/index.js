'use strict';

const cheerio = require('cheerio');
const mailgun = require('../../config/mailgun');
const request = require('request');

const sites = [
  require('./sites/blueNoteGrill'),
  require('./sites/socialDurham')
];

function emailJordanAboutHisBadScraper(site, error) {
  const email = 'jahammo2@gmail.com';
  const body = `This site was not successfully scraped: ${site.url}. It was due to this reason: ${error.stack}`;

  mailgun.sendEmail(
    email,
    'Your Veery scraper failed',
    body
  );

  return error;
}

const siteScraper = {
  run() {
    return sites.map((site) => {
      return new Promise((resolve, reject) => {
        return request(site.url, (error, response, html) => {
          if (error) {
            reject(emailJordanAboutHisBadScraper(site, error));
          }

          const $ = cheerio.load(html);

          try {
            const { events, venue } = site.run($);
            resolve({ events, venue });
          } catch (e) {
            emailJordanAboutHisBadScraper(site, e);
            // resolving because I just want this to return null so other sites that are being scraped can get their events displayed
            resolve();
          }
        });
      });
    });
  }
};

module.exports = siteScraper;
