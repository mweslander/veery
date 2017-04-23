const cheerio = require('cheerio');
const request = require('request');

const sites = [
  require('./blueNoteGrill'),
  require('./socialDurham')
];

function buildEventsAndVenues() {
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

module.exports = buildEventsAndVenues();
