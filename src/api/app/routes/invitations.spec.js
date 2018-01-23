'use strict';

const mailgun = require('../../../config/mailgun');
const Invitation = require('../../models/invitation');
const User = require('../../models/user');
const {
  app,
  createInvitation,
  shared,
  signInAndCreateUser
} = require('../../../spec/specHelper');

function establishSpecResources(agent, role, callback = () => {}) {
  return createInvitation()
    .then(callback);
}

describe('invitations requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /invitations/:id', function() {
    let agent;
    let sendEmail;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
    });

    context('when the invitation exists', function() {
      let invitation;

      beforeEach(function() {
        const invitationDetails = {
          email: faker.internet.email(),
          role: 'venueAdmin'
        };

        return establishSpecResources()
          .then((invitation) => {
            this.endpoint = `/api/invitations/${invitation._id}`;
          });
      });

      afterEach(function() {
        return Promise.all([
          User.remove(),
          Invitation.remove()
        ]);
      });

      it('redirects to the front end url with filled queries', function(done) {
        apiRequest(this.app)
          .get(this.endpoint)
          .redirects(0)
          .then(expect.fail)
          .catch(({ response }) => {
            expect(response.header.location).to.include(`/#/register?invitationId=${encodeURIComponent(invitation._id)}&email=${encodeURIComponent(invitation.email)}`);
            done();
          });
      });
    });

    // context('when the invitation does not exist', function() {
    //   beforeEach(function() {
    //     const invitationDetails = buildInvitation('admin', 1);
    //
    //     const promises = [
    //       createUser('superAdmin'),
    //       new Invitation(invitationDetails)
    //         .save()
    //         .then(() => {
    //           this.endpoint = '/api/invitations/0';
    //         })
    //     ];
    //
    //     return Promise.all(promises);
    //   });
    //
    //   afterEach(function() {
    //     return Promise.all([
    //       User.remove(),
    //       Invitation.remove()
    //     ]);
    //   });
    //
    //   it('redirects to the front end url without queries', function(done) {
    //     apiRequest(this.app)
    //       .get(this.endpoint)
    //       .redirects(0)
    //       .then(expect.fail)
    //       .catch(({ response }) => {
    //         expect(response.header.location).to.include('/#/register');
    //         expect(response.header.location).to.not.include('?invitationId=');
    //         done();
    //       });
    //   });
    // });
  });
});
