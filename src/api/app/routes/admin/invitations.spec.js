'use strict';

const mailgun = require('../../../config/mailgun');
const Invitation = require('../../models/invitation');
const User = require('../../models/user');
const {
  app,
  createUser,
  shared,
  signInAndCreateUser
} = require('../../../spec/specHelper');

function establishSpecResources(agent, role, callback = () => {}) {
  return signInAndCreateUser(agent, role)
    .then(callback);
}

describe('admin invitation requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('POST /admin/invitations', function() {
    let agent;
    let endpoint;
    let sendEmail;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/admin/invitations';
      sendEmail = this.sandbox.stub(mailgun, 'sendEmail');
    });

    context('when the inviter is an admin', function() {
      context('when the params are valid', function() {
        let invitationDetails;

        beforeEach(function() {
          invitationDetails = {
            email: faker.internet.email().toLowerCase(),
            role: 'venueAdmin'
          };

          return establishSpecResources(agent, 'admin')
            .then(() => {
              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        afterEach(function() {
          return Promise.all([
            Invitation.remove(),
            User.remove()
          ]);
        });

        shared.itBehavesLike('a protected POST endpoint');

        it('creates an invitation', function() {
          return this.promise
            .then(() => Invitation.findOne({ email: invitationDetails.email }))
            .then((invitation) => {
              expect(invitation).to.be.an.object;
              expect(invitation.role).to.equal('venueAdmin');
            });
        });

        it('sends an email indicating the invitation was created', function() {
          return this.promise
            .then(() => {
              expect(sendEmail.calledOnce).to.be.true;
              const [email] = sendEmail.firstCall.args;
              expect(email).to.equal(invitationDetails.email);
            });
        });

        it('responds with a 201', function() {
          return this.promise
            .then((response) => {
              const responseJSON = JSON.parse(response.text);
              expect(response).to.have.status(201);
              expect(responseJSON).to.deep.equal({
                message: `Account activation email sent to ${invitationDetails.email}`
              });
            });
        });
      });

      context('when a user with email already exists', function() {
        let email;

        beforeEach(function() {
          email = faker.internet.email().toLowerCase();

          return createUser('venueAdmin', { email })
            .then(() => establishSpecResources(agent, 'admin'))
            .then(() => {
              const invitationDetails = {
                email,
                role: 'venueAdmin'
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('a protected POST endpoint');
        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not invite that user', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              expect(sendEmail.called).to.be.false;
            });
        });

        it('does not create an invitation', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              return Invitation
                .findOne({ email })
                .lean();
            })
            .then((invitation) => {
              expect(invitation).not.to.exist;
            });
        });
      });

      context('when a user with email has already been invited', function() {
      });
    });
  });
});
