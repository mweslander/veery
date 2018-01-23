'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminEventsController = require('../../../controllers/admin/events');
const eventsMiddleware = require('../../../../config/middlewares/events');

module.exports = function(api) {
  api.delete('/admin/events/:id', authentication.requireLoggedInUser, eventsMiddleware.findAccessibleEvent, AdminEventsController.destroy);
};
