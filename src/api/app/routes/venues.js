'use strict';

const authentication = require('../../config/middlewares/authentication');
const VenuesController = require('../controllers/venues');

module.exports = function(api) {
  api.get('/venues', VenuesController.index);
  api.post('/venues', authentication.requireLoggedInUser, VenuesController.create);
  api.delete('/venues/:id', authentication.requireLoggedInUser, VenuesController.destroy);
};
