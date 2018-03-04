'use strict';

const mailgun = require('../../../config/mailgun');
const Invitation = require('../../models/invitation');
const User = require('../../models/user');
const Venue = require('../../models/venue');
const {
  app,
  createUser,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../../support/spec/specHelper');

function establishSpecResources(agent, role, extraVenues = () => []) {
  return signInAndCreateUser(agent, role)
    .then((admin) => {
      const promises = [];

      for (let i = 10; i > 0; i--) {
        promises.push(createVenue());
      }

      return Promise.all(_.flatten([promises, extraVenues(admin)]));
    });
}

function aFailedInvite(promise, email, sendEmail) {
  return promise
    .then(expect.fail)
    .catch(() => Invitation.findOne({ email }).lean())
    .then((invitation) => {
      expect(invitation).not.to.exist;
      expect(sendEmail.called).to.be.false;
    });
}

function aSuccessfulInvite(promise, invitationDetails, sendEmail, expectationCallback = () => {}) {
  return promise
    .then(() => Invitation.findOne({ email: invitationDetails.email }))
    .then((invitation) => {
      const venues = invitation.venues.map((venue) => venue.toString());
      expect(invitation).to.be.an.object;
      expect(invitation.role).to.equal('venueAdmin');
      // mailgun tests
      expect(sendEmail.calledOnce).to.be.true;
      const [email] = sendEmail.firstCall.args;
      expect(email).to.equal(invitationDetails.email);
      // extra tests
      return expectationCallback(venues);
    });
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
    let email;
    let endpoint;
    let sendEmail;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      email = faker.internet.email().toLowerCase();
      endpoint = '/api/admin/invitations';
      sendEmail = this.sandbox.stub(mailgun, 'sendEmail');
    });

    afterEach(function() {
      return Promise.all([
        Invitation.remove(),
        User.remove(),
        Venue.remove()
      ]);
    });

    context('when the inviter is an admin', function() {
      context('when the params are valid', function() {
        let attachedVenue;
        let invitationDetails;

        beforeEach(function() {
          return establishSpecResources(agent, 'admin')
            .then((venues) => {
              attachedVenue = venues[0];
              invitationDetails = {
                email: faker.internet.email().toLowerCase(),
                role: 'venueAdmin',
                venues: [attachedVenue._id]
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('invites the user', function() {
          const expectationCallback = (venues) => {
            expect(venues).to.include(attachedVenue._id.toString());
          };

          return aSuccessfulInvite(this.promise, invitationDetails, sendEmail, expectationCallback);
        });
      });

      context('when an email was not attached', function() {
        beforeEach(function() {
          return establishSpecResources(agent, 'admin')
            .then(() => {
              const invitationDetails = {
                role: 'venueAdmin'
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 422 });

        it('does not invite that user', function() {
          return aFailedInvite(this.promise, email, sendEmail);
        });
      });

      context('when a user with that email already exists', function() {
        beforeEach(function() {
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

        shared.itBehavesLike('an invalid request', { statusCode: 403 });

        it('does not invite that user', function() {
          return aFailedInvite(this.promise, email, sendEmail);
        });
      });

      context('when a user with email has already been invited', function() {
        // not the current setup but will be in the future
        it('combines resends the invitation');
      });
    });

    context('when the inviter is a venueAdmin', function() {
      let extraVenues;

      beforeEach(function() {
        extraVenues = (admin) => {
          const promises = [];

          for (let i = 10; i > 0; i--) {
            promises.push(createVenue({ venueAdmins: [admin._id] }));
          }

          return promises;
        };
      });

      context('when the inviter does have access to the venues', function() {
        let attachedVenue;
        let invitationDetails;

        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', extraVenues)
            .then((venues) => {
              attachedVenue = venues[venues.length - 1];
              invitationDetails = {
                email,
                role: 'venueAdmin',
                venues: [attachedVenue._id]
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('invites the user', function() {
          const expectationCallback = (venues) => {
            expect(venues).to.include(attachedVenue._id.toString());
          };

          return aSuccessfulInvite(this.promise, invitationDetails, sendEmail, expectationCallback);
        });
      });

      context('when the inviter does not have access to the venues', function() {
        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin', extraVenues)
            .then((venues) => {
              const attachedVenue = venues[0];
              const invitationDetails = {
                email,
                role: 'venueAdmin',
                venues: [attachedVenue._id]
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 401 });

        it('does not invite that user', function() {
          return aFailedInvite(this.promise, email, sendEmail);
        });
      });

      context('when the inviter attached an admin role', function() {
        beforeEach(function() {
          return establishSpecResources(agent, 'venueAdmin')
            .then(() => {
              const invitationDetails = {
                email,
                role: 'admin',
                venues: []
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 401 });

        it('does not invite that user', function() {
          return aFailedInvite(this.promise, email, sendEmail);
        });
      });
    });

    context('when the inviter does not exist', function() {
      context('when the params are valid', function() {
        let invitationDetails;

        beforeEach(function() {
          invitationDetails = {
            email,
            role: 'venueAdmin',
            venues: []
          };

          this.promise = agent
            .post(endpoint)
            .send(invitationDetails);
        });

        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('invites the user', function() {
          return aSuccessfulInvite(this.promise, invitationDetails, sendEmail);
        });
      });

      context('when the inviter attached a venue', function() {
        let attachedVenue;
        let invitationDetails;

        beforeEach(function() {
          const promises = [];

          for (let i = 10; i > 0; i--) {
            promises.push(createVenue());
          }

          return Promise.all(promises)
            .then((venues) => {
              attachedVenue = venues[venues.length - 1];
              invitationDetails = {
                email,
                role: 'venueAdmin',
                venues: [attachedVenue._id]
              };

              this.promise = agent
                .post(endpoint)
                .send(invitationDetails);
            });
        });

        shared.itBehavesLike('an invalid request', { statusCode: 401 });

        it('does not invite that user', function() {
          return aFailedInvite(this.promise, email, sendEmail);
        });
      });
    });
  });
});
