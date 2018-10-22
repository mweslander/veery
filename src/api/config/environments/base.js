'use strict';

const env = process.env;

module.exports = {
  admin: {
    password: env.ADMIN_PASSWORD
  },
  database: {
    mongodbUri: env.MONGODB_URI
  },
  domain: env.DOMAIN,
  googleAnalytics: {
    propertyId: env.GOOGLE_ANALYTICS_PROPERTY_ID
  },
  googleMaps: {
    key: env.GOOGLE_MAPS_KEY
  },
  mailgun: {
    apiKey: env.MAILGUN_API_KEY,
    domain: env.MAILGUN_DOMAIN
  },
  sessionSecret: env.SESSION_SECRET
};
