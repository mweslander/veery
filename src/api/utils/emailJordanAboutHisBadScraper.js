'use strict';

const mailgun = require('../config/mailgun');

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

module.exports = emailJordanAboutHisBadScraper;
