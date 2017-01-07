'use strict';

const VenuesController = require('../controllers/venues');

module.exports = function(api) {
  api.get('/venues', VenuesController.index);
};
