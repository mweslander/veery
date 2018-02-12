'use strict';

const googleMaps = require('@google/maps');

const config = require('./index.js');

function geocode(address) {
  return new Promise((resolve, reject) => {
    const googleMapsClient = googleMaps.createClient({
      key: config.googleMaps.key
    });

    return googleMapsClient.geocode({ address }, (err, response) => {
      if (err) { reject(err.json.error_message); }
      return resolve(response.json.results[0].geometry.location);
    });
  });
}

module.exports = {
  geocode
};
