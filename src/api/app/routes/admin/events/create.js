'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminEventsController = require('../../../controllers/admin/events');
const venuesMiddleware = require('../../../../config/middlewares/venues');

module.exports = function(api) {
  api.post('/admin/events', authentication.requireLoggedInUser, venuesMiddleware.findAccessibleVenue, AdminEventsController.create);
};
