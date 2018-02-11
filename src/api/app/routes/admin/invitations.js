'use strict';

const AdminInvitationsController = require('../../controllers/admin/invitations');
const invitationsMiddleware = require('../../../config/middlewares/invitations');

module.exports = function(api) {
  api.post('/admin/invitations', invitationsMiddleware.ensureAccessibility, AdminInvitationsController.create);
};
