'use strict';

const authentication = require('../../../../config/middlewares/authentication');
const AdminEventsController = require('../../../controllers/admin/events');

module.exports = function(api) {
  api.get('/admin/events', authentication.requireLoggedInUser, AdminEventsController.showAll);
};
