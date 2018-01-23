'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminVenuesController = require('../../../controllers/admin/venues');

module.exports = function(api) {
  api.get('/admin/venues', authentication.requireLoggedInUser, AdminVenuesController.showAll);
};
