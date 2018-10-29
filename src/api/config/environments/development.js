'use strict';

const base = require('./base');

module.exports = {
  admin: {
    password: base.admin.password || 'password'
  },
  database: {
    mongodbUri: base.database.mongodbUri || 'mongodb://localhost/veery_development'
  },
  domain: base.domain || 'localhost',
  googleAnalytics: {
    propertyId: base.googleAnalytics.propertyId || 'UA-114144285-2'
  },
  googleMaps: {
    key: base.googleMaps.key || 'AIzaSyBqtMZ7Hndm7fhCS9KbTYVb0xMr-JYVu_Y'
  },
  mailgun: {
    apiKey: base.mailgun.apiKey || 'key-870c72393e50ee32d6306cb91924cd02',
    domain: base.mailgun.domain || 'sandboxb3c88bf4188e4f6ca71624650ecfcf08.mailgun.org'
  },
  sessionSecret: base.sessionSecret || 'secret'
};
