'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminVenuesController = require('../../../controllers/admin/venues');

module.exports = function(api) {
  api.post('/admin/venues', authentication.requireLoggedInUser, AdminVenuesController.create);
};
