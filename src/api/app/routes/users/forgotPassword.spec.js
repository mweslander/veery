'use strict';

const mailgun = require('../../../config/mailgun');
const User = require('../../models/user');
const {
  app,
  createUser,
  shared
} = require('../../../spec/specHelper');

describe('user requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('POST /forgot-password', function() {
    let agent;
    let endpoint;
    let sendEmail;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/forgot-password';
      sendEmail = this.sandbox.stub(mailgun, 'sendEmail');
    });

    afterEach(function() {
      return Promise.all([
        User.remove()
      ]);
    });

    context('with valid params', function() {
      let venueAdmin;

      beforeEach(function() {
        return createUser('venueAdmin')
          .then((newAdmin) => {
            venueAdmin = newAdmin;

            this.promise = agent
              .post(endpoint)
              .send({ email: venueAdmin.email });
          });
      });

      shared.itBehavesLike('a valid request', { statusCode: 202 });

      it('sends an email to that email with a reset password token', function() {
        return this.promise
          .then(() => {
            return User.findById(venueAdmin._id);
          })
          .then((user) => {
            expect(sendEmail.calledOnce).to.be.true;
            const [email, _, message] = sendEmail.firstCall.args; // eslint-disable-line no-unused-vars
            expect(email).to.equal(venueAdmin.email);
            const resetPasswordToken = user.resetPasswordToken;
            expect(message.indexOf(resetPasswordToken)).to.be.above(-1);
          });
      });
    });

    context('with invalid params', function() {
      context('when there is no email attached', function() {
        beforeEach(function() {
          return createUser('venueAdmin')
            .then(() => {
              this.promise = agent
                .post(endpoint)
                .send({ email: null });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not send an email to that email', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              expect(sendEmail.calledOnce).to.be.false;
            });
        });
      });

      context('when there is no user with that email', function() {
        beforeEach(function() {
          return createUser('venueAdmin')
            .then(() => {
              this.promise = agent
                .post(endpoint)
                .send({ email: faker.internet.password() });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 404 });

        it('does not send an email to that email', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              expect(sendEmail.calledOnce).to.be.false;
            });
        });
      });
    });
  });
});
