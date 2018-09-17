'use strict';

module.exports = {
  admin: {
    password: process.env.ADMIN_PASSWORD || 'password'
  },
  database: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/veery_development'
  },
  domain: process.env.DOMAIN || 'localhost',
  googleAnalytics: {
    propertyId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID || 'UA-114144285-2'
  },
  googleMaps: {
    key: process.env.GOOGLE_MAPS_KEY || 'AIzaSyBqtMZ7Hndm7fhCS9KbTYVb0xMr-JYVu_Y'
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY || 'key-870c72393e50ee32d6306cb91924cd02',
    domain: process.env.MAILGUN_DOMAIN || 'sandboxb3c88bf4188e4f6ca71624650ecfcf08.mailgun.org'
  },
  sessionSecret: process.env.SESSION_SECRET || 'secret'
};
