'use strict';

const Invitation = require('../models/invitation');
const User = require('../models/user');
const {
  app,
  createInvitation
} = require('../../../../support/spec/specHelper');

function establishSpecResources() {
  return createInvitation('venueAdmin')
    .then((invitation) => invitation);
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

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
    });

    afterEach(function() {
      return Promise.all([
        User.remove(),
        Invitation.remove()
      ]);
    });

    context('when the invitation exists', function() {
      let invitation;

      beforeEach(function() {
        return establishSpecResources()
          .then((newInvitation) => {
            invitation = newInvitation;
            const endpoint = `/api/invitations/${invitation._id}`;

            this.promise = agent
              .get(endpoint);
          });
      });

      it('redirects to the front end url with filled queries', function() {
        // by forcing no redirects, I can then use .catch to test the location
        return this.promise
          .redirects(0)
          .then(expect.fail)
          .catch(({ response }) => {
            expect(response.header.location).to.include(`/#/admin/register?invitationId=${encodeURIComponent(invitation._id)}&email=${encodeURIComponent(invitation.email)}`);
          });
      });
    });

    context('when the invitation does not exist', function() {
      beforeEach(function() {
        const endpoint = '/api/invitations/0';

        this.promise = agent
          .get(endpoint);
      });

      it('redirects to the front end url without queries', function() {
        return this.promise
          .redirects(0)
          .then(expect.fail)
          .catch(({ response }) => {
            expect(response.header.location).to.include('/#/admin/register');
            expect(response.header.location).to.not.include('?invitationId=');
          });
      });
    });
  });
});
