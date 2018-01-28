'use strict';

const Venue = require('../../app/models/venue');

function buildVenue() {
  return {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    events: [],
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    name: faker.commerce.productName(),
    state: faker.address.state(),
    venueAdmins: [],
    zipCode: faker.address.zipCode().split('-')[0]
  };
}

function createVenue(options = {}) {
  const params = Object.assign({}, buildVenue(), options);

  return (new Venue(params)).save();
}

module.exports = createVenue;
