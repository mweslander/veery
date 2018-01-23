'use strict';

const createUser = require('./createUser');

function signInAndCreateUser(agent, role) {
  const password = faker.internet.password();

  return createUser(role, { password })
    .then((user) => {
      return agent
        .post('/api/sign-in')
        .send({ email: user.email, password })
        .then(() => user);
    });
}

module.exports = signInAndCreateUser;
