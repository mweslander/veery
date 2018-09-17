'use strict';

module.exports = {
  admin: {
    password: process.env.ADMIN_PASSWORD
  },
  database: {
    mongodbUri: process.env.MONGODB_URI
  },
  domain: process.env.DOMAIN,
  googleAnalytics: {
    propertyId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID
  },
  googleMaps: {
    key: process.env.GOOGLE_MAPS_KEY
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
  sessionSecret: process.env.SESSION_SECRET
};
