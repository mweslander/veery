'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminVenuesController = require('../../../controllers/admin/venues');
const venuesMiddleware = require('../../../../config/middlewares/venues');

module.exports = function(api) {
  api.put('/admin/venues/:id', authentication.requireLoggedInUser, venuesMiddleware.findAccessibleVenue, AdminVenuesController.update);
};
