'use strict';

const googleMaps = require('../../../../config/googleMaps');
const mailgun = require('../../../../config/mailgun');

const Invitation = require('../../../models/invitation');
const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
  createInvitation,
  createUser,
  shared,
  signInAndCreateUser
} = require('../../../../../../support/spec/specHelper');

function establishSpecResources(agent, role, callback = () => {}) {
  return signInAndCreateUser(agent, role)
    .then(callback);
}

function aValidVenueCreation(promise, attribute, key = 'name') {
  return promise
    .then(() => Venue.findOne({ [key]: attribute }).lean())
    .then((newVenue) => {
      expect(newVenue).to.exist;
      return newVenue;
    });
}

function aValidSelfAttachemnt(promise, creator, attribute, key = 'name') {
  return promise
    .then(() => Venue.findOne({ [key]: attribute }))
    .then((newVenue) => {
      const venueAdmins = newVenue.venueAdmins.map((admin) => admin.toString());
      expect(venueAdmins).to.include(creator._id.toString());
      return newVenue;
    });
}

describe('admin venue requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('POST /admin/venues', function() {
    let agent;
    let endpoint;
    let name;
    let sendEmail;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/admin/venues/';
      name = faker.hacker.noun();
      sendEmail = this.sandbox.stub(mailgun, 'sendEmail');
    });

    afterEach(function() {
      return Promise.all([
        Invitation.remove(),
        User.remove(),
        Venue.remove()
      ]);
    });

    context('when the address can be found', function() {
      let expectedLatitude;
      let expectedLongitude;

      beforeEach(function() {
        // not using faker.address.[lat/long]itude() bc if it ends in a zero, the db won't
        // store the zero and the tests will break for the wrong reason
        expectedLatitude = faker.random.number();
        expectedLongitude = faker.random.number();
        this.sandbox.stub(googleMaps, 'geocode').returns(Promise.resolve({
          lat: expectedLatitude,
          lng: expectedLongitude
        }));
      });

      context('when the creator is an admin', function() {
        context('when using basic attributes', function() {
          beforeEach(function() {
            return establishSpecResources(agent, 'admin')
              .then(() => {
                this.promise = agent
                  .post(endpoint)
                  .send({ name });
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('creates the venue', function() {
            return aValidVenueCreation(this.promise, name);
          });
        });

        context('when attaching an address', function() {
          beforeEach(function() {
            return establishSpecResources(agent, 'admin')
              .then(() => {
                const venueDetails = {
                  address: faker.address.streetAddress(),
                  city: faker.address.city(),
                  name,
                  state: faker.address.state()
                };

                this.promise = agent
                  .post(endpoint)
                  .send(venueDetails);
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('attaches the longitude and latitude of the address', function() {
            return aValidVenueCreation(this.promise, name)
              .then((newVenue) => {
                expect(newVenue.latitude).to.eq(expectedLatitude);
                expect(newVenue.longitude).to.eq(expectedLongitude);
              });
          });
        });
      });

      context('when attaching venueAdmins to the params', function() {
        context('when the venueAdmins already exist', function() {
          let existingVenueAdmins;

          beforeEach(function() {
            const promises = [];

            for (let i = 3; i > 0; i--) {
              promises.push(createUser('venueAdmin'));
            }

            return Promise.all(promises)
              .then((newAdmins) => {
                existingVenueAdmins = newAdmins;
                return establishSpecResources(agent, 'admin');
              })
              .then(() => {
                const ids = existingVenueAdmins.map((admin) => admin._id);
                this.promise = agent
                  .post(endpoint)
                  .send({ name, venueAdmins: ids });
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('creates the venue', function() {
            return aValidVenueCreation(this.promise, name);
          });

          it('attaches that venueAdmin to the venue', function() {
            return aValidVenueCreation(this.promise, name)
              .then((newVenue) => {
                const venueAdmins = newVenue.venueAdmins.map((admin) => admin.toString());
                expect(venueAdmins.length).to.eq(3);
                expect(venueAdmins).to.include(
                  existingVenueAdmins[0]._id.toString(),
                  existingVenueAdmins[1]._id.toString(),
                  existingVenueAdmins[2]._id.toString()
                );

                return User
                  .find({ venues: { $in: [newVenue._id] } })
                  .lean();
              })
              .then((users) => {
                expect(users.length).to.eq(3);
              });
          });
        });

        context('when the venueAdmin does not exist', function() {
          context('when the params are valid', function() {
            let email;

            beforeEach(function() {
              email = faker.internet.email().toLowerCase();

              return establishSpecResources(agent, 'admin')
                .then(() => {
                  this.promise = agent
                    .post(endpoint)
                    .send({ name, newVenueAdmins: [email] });
                });
            });

            shared.itBehavesLike('a protected POST endpoint');
            shared.itBehavesLike('a valid request', { statusCode: 201 });

            it('creates the venue', function() {
              return aValidVenueCreation(this.promise, name);
            });

            it('invites that person via email', function() {
              return this.promise
                .then(() => {
                  expect(sendEmail.calledOnce).to.be.true;
                  const [invitationEmail] = sendEmail.firstCall.args;
                  expect(invitationEmail).to.equal(email);
                });
            });

            it('creates an invitation', function() {
              return this.promise
                .then(() => {
                  return Invitation
                    .findOne({ email })
                    .lean();
                })
                .then((invitation) => {
                  expect(invitation).to.exist;
                  expect(invitation.email).to.equal(email);
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
                  this.promise = agent
                    .post(endpoint)
                    .send({ name, newVenueAdmins: [email] });
                });
            });

            shared.itBehavesLike('a protected POST endpoint');
            shared.itBehavesLike('an invalid request', { statusCode: 403 });

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

          context('when an invitation with email already exists', function() {
            let email;

            beforeEach(function() {
              email = faker.internet.email().toLowerCase();

              return createInvitation('venueAdmin', { email })
                .then(() => establishSpecResources(agent, 'admin'))
                .then(() => {
                  this.promise = agent
                    .post(endpoint)
                    .send({ name, newVenueAdmins: [email] });
                });
            });

            shared.itBehavesLike('a protected POST endpoint');
            shared.itBehavesLike('an invalid request', { statusCode: 422 });

            it('does not invite that user again', function() {
              return this.promise
                .then(expect.fail)
                .catch(() => {
                  expect(sendEmail.called).to.be.false;
                });
            });
          });
        });

        context('when one venueAdmin already exists and the other does not', function() {
          let email;
          let existingVenueAdmin;

          beforeEach(function() {
            email = faker.internet.email().toLowerCase();

            return createUser('venueAdmin')
              .then((newAdmin) => {
                existingVenueAdmin = newAdmin;
                return establishSpecResources(agent, 'admin');
              })
              .then(() => {
                this.promise = agent
                  .post(endpoint)
                  .send({ name, venueAdmins: [existingVenueAdmin._id], newVenueAdmins: [email] });
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('creates the venue', function() {
            return aValidVenueCreation(this.promise, name);
          });

          it('attaches that venueAdmin to the venue', function() {
            return aValidVenueCreation(this.promise, name)
              .then((newVenue) => {
                expect(newVenue.venueAdmins.length).to.eq(1);
                expect(newVenue.venueAdmins[0].toString()).to.eq(existingVenueAdmin._id.toString());
              });
          });

          it('invites that person via email', function() {
            return this.promise
              .then(() => {
                expect(sendEmail.calledOnce).to.be.true;
                const [invitationEmail] = sendEmail.firstCall.args;
                expect(invitationEmail).to.equal(email);
              });
          });

          it('creates an invitation', function() {
            return this.promise
              .then(() => {
                return Invitation
                  .findOne({ email })
                  .lean();
              })
              .then((invitation) => {
                expect(invitation).to.exist;
                expect(invitation.email).to.equal(email);
              });
          });
        });
      });

      context('when the creator is a venueAdmin', function() {
        context('when not attaching other venueAdmins to the params', function() {
          let creator;

          beforeEach(function() {
            return establishSpecResources(agent, 'venueAdmin', (newAdmin) => newAdmin)
              .then((newAdmin) => {
                creator = newAdmin;

                this.promise = agent
                  .post(endpoint)
                  .send({ name });
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('creates the venue', function() {
            return aValidVenueCreation(this.promise, name);
          });

          it('attaches itself as a venueAdmin to the newly created venue', function() {
            return aValidSelfAttachemnt(this.promise, creator, name);
          });
        });

        context('when attaching other venueAdmins to the params', function() {
          let anotherVenueAdmin;
          let creator;

          beforeEach(function() {
            return createUser('venueAdmin')
              .then((newAdmin) => {
                anotherVenueAdmin = newAdmin;
                return establishSpecResources(agent, 'venueAdmin', (admin) => admin);
              })
              .then((newAdmin) => {
                creator = newAdmin;

                this.promise = agent
                  .post(endpoint)
                  .send({ name, venueAdmins: [anotherVenueAdmin._id] });
              });
          });

          shared.itBehavesLike('a protected POST endpoint');
          shared.itBehavesLike('a valid request', { statusCode: 201 });

          it('creates the venue', function() {
            return aValidVenueCreation(this.promise, name);
          });

          it('attaches itself as a venueAdmin to the newly created venue', function() {
            return aValidSelfAttachemnt(this.promise, creator, name)
              .then((newVenue) => {
                expect(newVenue.venueAdmins.length).to.eq(2);
              });
          });
        });
      });
    });

    context('when the address cannot be found', function() {
      beforeEach(function() {
        this.sandbox.stub(googleMaps, 'geocode', () => Promise.reject());

        return establishSpecResources(agent, 'admin')
          .then(() => {
            const venueDetails = {
              address: faker.address.streetAddress(),
              city: faker.address.city(),
              name,
              state: faker.address.state()
            };

            this.promise = agent
              .post(endpoint)
              .send(venueDetails);
          });
      });

      shared.itBehavesLike('a protected POST endpoint');
      shared.itBehavesLike('an invalid request', { statusCode: 422 });

      it('does not create a venue and throws the error back', function() {
        return this.promise
          .then(expect.fail)
          .catch(({ response }) => {
            expect(response.error.text).to.exist;
            return Venue.findOne({ name });
          })
          .then((venue) => {
            expect(venue).not.to.exist;
          });
      });
    });
  });
});
