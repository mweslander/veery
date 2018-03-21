'use strict';

const mailgun = require('../../../config/mailgun');
const Invitation = require('../../models/invitation');
const User = require('../../models/user');
const Venue = require('../../models/venue');
const {
  app,
  createInvitation,
  createUser,
  createVenue,
  shared
} = require('../../../../../support/spec/specHelper');

function establishSpecResources(invitationDetails, venueOptions = {}) {
  return createVenue(venueOptions)
    .then((venue) => {
      invitationDetails.venues = [venue._id];
      return createInvitation('venueAdmin', invitationDetails);
    })
    .then((invitation) => invitation);
}

function aValidUserCreation(promise, email, agent) {
  return promise
    .then(() => {
      return User.findOne({ email });
    })
    .then((user) => {
      expect(user).to.exist;
      expect(user.role).to.eq('venueAdmin');
      return agent.get('/api/is-signed-in');
    })
    .then((res) => {
      expect(res.body.user).to.exist;
    });
}

function aValidVenueAdminAttachment(promise, email, invitation, expectedLength) {
  let user;

  return promise
    .then(() => {
      return User.findOne({ email });
    })
    .then((foundUser) => {
      user = foundUser;

      const venues = user.venues.map((venue) => venue.toString());
      expect(venues.length).to.eq(invitation.venues.length);
      expect(venues).to.include(invitation.venues[0].toString());

      return Venue.findById(venues[0]);
    })
    .then((venue) => {
      const venueAdmins = venue.venueAdmins.map((admin) => admin.toString());
      expect(venueAdmins).to.include(user._id.toString());
      expect(venueAdmins.length).to.eq(expectedLength);
    });
}

function aValidInvitationDeletion(promise, email) {
  return promise
    .then(() => {
      return Invitation.findOne({ email });
    })
    .then((foundInvitation) => {
      expect(foundInvitation).not.to.exist;
    });
}

function anInvalidUserCreation(promise, email) {
  return promise
    .then(expect.fail)
    .catch(() => {
      return User.findOne({ email });
    })
    .then((user) => {
      expect(user).not.to.exist;
    });
}

describe('user requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('POST /register', function() {
    let agent;
    let baseParams;
    let email;
    let endpoint;
    let password;

    beforeEach(function() {
      agent = apiRequest(app);
      email = faker.internet.email().toLowerCase();
      password = faker.internet.password();
      baseParams = {
        password,
        passwordConfirmation: password
      };
      this.agent = agent;
      endpoint = '/api/register';
      this.sandbox.stub(mailgun, 'sendEmail');
    });

    afterEach(function() {
      return Promise.all([
        Invitation.remove(),
        User.remove(),
        Venue.remove()
      ]);
    });

    context('when the invitation exists', function() {
      context('when the params are valid', function() {
        context('when the user has a good password and it matches the password confirmation', function() {
          let invitation;

          beforeEach(function() {
            const invitationDetails = { email };

            return establishSpecResources(invitationDetails)
              .then((newInvitation) => {
                invitation = newInvitation;
                const params = Object.assign({}, baseParams, { invitationId: invitation._id });

                this.promise = agent
                  .post(endpoint)
                  .send(params);
              });
          });

          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('will create a user and sign that user in', function() {
            return aValidUserCreation(this.promise, email, agent);
          });

          it('adds the new user on as a venueAdmin', function() {
            return aValidVenueAdminAttachment(this.promise, email, invitation, 1);
          });

          it('will delete the invitation', function() {
            return aValidInvitationDeletion(this.promise, email);
          });
        });

        context('when the venue does not have any venueAdmins', function() {
          let invitation;

          beforeEach(function() {
            const invitationDetails = { email };

            return establishSpecResources(invitationDetails)
              .then((newInvitation) => {
                invitation = newInvitation;
                const params = Object.assign({}, baseParams, { invitationId: invitation._id });

                this.promise = agent
                  .post(endpoint)
                  .send(params);
              });
          });

          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('will create a user and sign that user in', function() {
            return aValidUserCreation(this.promise, email, agent);
          });

          it('adds the new user on as a venueAdmin', function() {
            return aValidVenueAdminAttachment(this.promise, email, invitation, 1);
          });

          it('will delete the invitation', function() {
            return aValidInvitationDeletion(this.promise, email);
          });
        });

        context('when the venue already has venueAdmins', function() {
          let invitation;

          beforeEach(function() {
            const invitationDetails = { email };

            return createUser('venueAdmin')
              .then((newAdmin) => {
                return establishSpecResources(invitationDetails, { venueAdmins: [newAdmin._id] });
              })
              .then((newInvitation) => {
                invitation = newInvitation;
                const params = Object.assign({}, baseParams, { invitationId: invitation._id });

                this.promise = agent
                  .post(endpoint)
                  .send(params);
              });
          });

          it('will create a user and sign that user in', function() {
            return aValidUserCreation(this.promise, email, agent);
          });

          it('adds the new user on as a venueAdmin', function() {
            return aValidVenueAdminAttachment(this.promise, email, invitation, 2);
          });

          it('will delete the invitation', function() {
            return aValidInvitationDeletion(this.promise, email);
          });
        });
      });

      context('when there is no password attached to the params', function() {
        let invitation;

        beforeEach(function() {
          const invitationDetails = { email };

          return establishSpecResources(invitationDetails)
            .then((newInvitation) => {
              invitation = newInvitation;

              this.promise = agent
                .post(endpoint)
                .send({ invitationId: invitation._id });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('will not create a user', function() {
          return anInvalidUserCreation(this.promise, email);
        });

        it('will not delete the invitation', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              return Invitation.findOne({ email });
            })
            .then((foundInvitation) => {
              expect(foundInvitation).to.exist;
            });
        });
      });

      context('when there is no password confirmation attached to the params', function() {
        let invitation;

        beforeEach(function() {
          const invitationDetails = { email };

          return establishSpecResources(invitationDetails)
            .then((newInvitation) => {
              invitation = newInvitation;

              this.promise = agent
                .post(endpoint)
                .send({ password, invitationId: invitation._id });
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('will not create a user', function() {
          return anInvalidUserCreation(this.promise, email);
        });

        it('will not delete the invitation', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              return Invitation.findOne({ email });
            })
            .then((foundInvitation) => {
              expect(foundInvitation).to.exist;
            });
        });
      });

      context('when the password sucks', function() {
        let invitation;
        let suckyPassword;

        beforeEach(function() {
          const invitationDetails = { email };

          return establishSpecResources(invitationDetails)
            .then((newInvitation) => {
              invitation = newInvitation;
              suckyPassword = '123';
              const params = {
                password: suckyPassword,
                passwordConfirmation: suckyPassword,
                invitationId: invitation._id
              };

              this.promise = agent
                .post(endpoint)
                .send(params);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('will not create a user', function() {
          return anInvalidUserCreation(this.promise, email);
        });

        it('will not delete the invitation', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => {
              return Invitation.findOne({ email });
            })
            .then((foundInvitation) => {
              expect(foundInvitation).to.exist;
            });
        });
      });
    });

    context('when the invitation does not exist', function() {
      beforeEach(function() {
        const params = Object.assign({}, baseParams, { invitationId: 0 });

        this.promise = agent
          .post(endpoint)
          .send(params);
      });

      shared.itBehavesLike('an invalid request', { statusCode: 404 });

      it('will not create a user', function() {
        return anInvalidUserCreation(this.promise, email);
      });
    });
  });
});
