'use strict';

const Invitation = require('../../app/models/invitation');

function buildInvitation(role) {
  return {
    email: faker.internet.email().toLowerCase(),
    role
  };
}

function createInvitation(role, options = {}) {
  const params = Object.assign({}, buildInvitation(role), options);

  return (new Invitation(params)).save();
}

module.exports = createInvitation;
