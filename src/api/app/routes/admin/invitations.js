'use strict';

const authentication = require('../../../config/middlewares/authentication');
const AdminInvitationsController = require('../../controllers/admin/invitations');

module.exports = function(api) {
  api.post('/admin/invitations', authentication.requireLoggedInUser, AdminInvitationsController.create);
};
