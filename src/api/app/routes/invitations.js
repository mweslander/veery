'use strict';

const InvitationsController = require('../controllers/invitations');

module.exports = function(api) {
  api.get('/invitations/:id', InvitationsController.show);
};
