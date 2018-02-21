'use strict';

const User = require('../../models/user');
const {
  app,
  createUser,
  shared
} = require('../../../spec/specHelper');

function aFailedPasswordReset(promise, venueAdmin, password) {
  return promise
    .then(expect.fail)
    .catch(() => User.findById(venueAdmin._id))
    .then((_user) => {
      return Promise.all([
        _user.comparePassword(password),
        venueAdmin.comparePassword(password)
      ]);
    })
    .then(([isMatchOnUser, isMatchOnVenueAdmin]) => {
      expect(isMatchOnUser).to.be.false;
      expect(isMatchOnVenueAdmin).to.be.false;
    });
}

describe.only('user requests', function() {
  let agent;
  let endpoint;
  let resetPasswordExpires;
  let resetPasswordToken;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    agent = apiRequest(app);
    this.agent = agent;
    resetPasswordExpires = Date.now() + 3600000;
    resetPasswordToken = faker.random.uuid();
    endpoint = `/api/reset-password/${resetPasswordToken}`;
  });

  afterEach(function() {
    this.sandbox.restore();
    return Promise.all([
      User.remove()
    ]);
  });

  describe('PUT /reset-password?token=', function() {
    let baseParams;
    let password;
    let venueAdmin;

    beforeEach(function() {
      password = faker.internet.password();
      baseParams = {
        password,
        passwordConfirmation: password
      }
    });

    context('with valid params', function() {
      beforeEach(function() {
        const options = { resetPasswordExpires, resetPasswordToken };

        return createUser('venueAdmin', options)
          .then((newAdmin) => {
            venueAdmin = newAdmin;

            this.promise = agent
              .put(endpoint)
              .send(baseParams);
          });
      });

      shared.itBehavesLike('a valid request', { statusCode: 202 });

      it('resets the password and signs in the user', function() {
        return this.promise
          .then(() => User.findById(venueAdmin._id))
          .then((user) => {
            return Promise.all([
              user.comparePassword(password),
              venueAdmin.comparePassword(password)
            ]);
          })
          .then(([isMatchOnUser, isMatchOnVenueAdmin]) => {
            expect(isMatchOnUser).to.be.true;
            expect(isMatchOnVenueAdmin).to.be.false;
            return agent.get('/api/is-signed-in');
          })
          .then((res) => {
            expect(res.body.user).to.exist;
          });
      });

      it('removes the reset password token and expires', function() {
        return this.promise
          .then(() => User.findById(venueAdmin._id))
          .then((user) => {
            expect(user.resetPasswordExpires).to.be.null;
            expect(user.resetPasswordToken).to.be.null;
          });
      });
    });

    context('with invalid params', function() {
      context('when there is not a password', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires, resetPasswordToken };

          return createUser('venueAdmin', options)
            .then((newAdmin) => {
              venueAdmin = newAdmin;

              this.promise = agent
                .put(endpoint)
                .send({ password: null });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not change the password', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => User.findById(venueAdmin._id))
            .then((_user) => {
              return Promise.all([
                _user.comparePassword(password),
                venueAdmin.comparePassword(password)
              ]);
            })
            .then(([isMatchOnUser, isMatchOnVenueAdmin]) => {
              expect(isMatchOnUser).to.be.false;
              expect(isMatchOnVenueAdmin).to.be.false;
            });
        });
      });

      context('when the password does not match the password confirmation', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires, resetPasswordToken };

          return createUser('venueAdmin', options)
            .then((newAdmin) => {
              venueAdmin = newAdmin;

              this.promise = agent
                .put(endpoint)
                .send({ password, passwordConfirmation: 'foobar' });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not change the password', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => User.findById(venueAdmin._id))
            .then((_user) => {
              return Promise.all([
                _user.comparePassword(password),
                venueAdmin.comparePassword(password)
              ]);
            })
            .then(([isMatchOnUser, isMatchOnVenueAdmin]) => {
              expect(isMatchOnUser).to.be.false;
              expect(isMatchOnVenueAdmin).to.be.false;
            });
        });
      });

      context('when the password sucks', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires, resetPasswordToken };

          return createUser('venueAdmin', options)
            .then((newAdmin) => {
              venueAdmin = newAdmin;
              const suckyPassword = '123';

              this.promise = agent
                .put(endpoint)
                .send({ password: suckyPassword, passwordConfirmation: suckyPassword });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not change the password', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => User.findById(venueAdmin._id))
            .then((_user) => {
              return Promise.all([
                _user.comparePassword(password),
                venueAdmin.comparePassword(password)
              ]);
            })
            .then(([isMatchOnUser, isMatchOnVenueAdmin]) => {
              expect(isMatchOnUser).to.be.false;
              expect(isMatchOnVenueAdmin).to.be.false;
            });
        });
      });

      context('when the token cannot be found on a user', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires, resetPasswordToken: 0 };

          return createUser('venueAdmin', options)
            .then((newAdmin) => {
              venueAdmin = newAdmin;

              this.promise = agent
                .put(endpoint)
                .send(baseParams);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 401 });

        it('does not change the password', function() {
          return aFailedPasswordReset(this.promise, venueAdmin, password);
        });
      });

      context('when the token has expired', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires: Date.now() - 1000, resetPasswordToken };

          return createUser('venueAdmin', options)
            .then((newAdmin) => {
              venueAdmin = newAdmin;

              this.promise = agent
                .put(endpoint)
                .send(baseParams);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 401 });

        it('does not change the password', function() {
          return aFailedPasswordReset(this.promise, venueAdmin, password);
        });
      });
    });
  });

  describe('GET /reset-password/:token', function() {
    beforeEach(function() {
      this.promise = agent
        .get(endpoint);
    });

    context('with valid params', function() {
      context('with attached reset password token', function() {
        beforeEach(function() {
          const options = { resetPasswordToken, resetPasswordExpires };
          return createUser('venueAdmin', options);
        });

        it('redirects to the frontend with the token attached', function() {
          return this.promise
            .redirects(0)
            .then(expect.fail)
            .catch(({ response }) => {
              expect(response.header.location).to.include(`/#/admin/reset-password?token=${resetPasswordToken}`);
            });
        });
      });
    });

    context('with invalid params', function() {
      context('without attached reset password token', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires, resetPasswordToken: 0 };
          return createUser('venueAdmin', options);
        });

        it('redirects to the password', function() {
          return this.promise
            .redirects(0)
            .then(expect.fail)
            .catch(({ response }) => {
              expect(response.header.location).to.include('/#/admin/forgot-password?token=expired');
            });
        });
      });

      context('when the reset password token has expired', function() {
        beforeEach(function() {
          const options = { resetPasswordExpires: Date.now() - 1000, resetPasswordToken };
          return createUser('venueAdmin', options);
        });

        it('redirects to the password', function() {
          return this.promise
            .redirects(0)
            .then(expect.fail)
            .catch(({ response }) => {
              expect(response.header.location).to.include('/#/admin/forgot-password?token=expired');
            });
        });
      });
    });
  });
});
