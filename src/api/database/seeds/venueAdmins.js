'use strict';

const config = require('../../config');

function venueAdmins() {
  const users = []

  for (let i = 10; i > 0; i--) {
    const venueAdmin = {
      email: `venueadmin-${i}@example.com`,
      password: config.admin.password,
      role: 'venueAdmin'
    };

    users.push(venueAdmin);
  }

  return users;
}

module.exports = venueAdmins();
