'use strict';

const moment = require('moment-holiday');

const Event = require('../../../models/event');
const User = require('../../../models/user');
const Venue = require('../../../models/venue');
const {
  app,
  createVenue,
  shared,
  signInAndCreateUser
} = require('../../../../spec/specHelper');

function establishSpecResources(agent, role, venuesCallback = () => {}) {
  return signInAndCreateUser(agent, role)
    .then((newAdmin) => venuesCallback(newAdmin));
}

function aValidEventCreation(promise, venue, attribute, key = 'title', expectationCallback = () => {}) {
  return promise
    .then(() => Event.findOne({ [key]: attribute }))
    .then((newEvent) => {
      expect(newEvent).to.exist;
      expect(newEvent.venue.toString()).to.eq(venue._id.toString());
      expectationCallback(newEvent);
    });
}

describe('admin event requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('POST /admin/events', function() {
    let agent;
    let baseParams;
    let endpoint;
    let title;

    beforeEach(function() {
      agent = apiRequest(app);
      title = faker.hacker.noun();
      baseParams = {
        startDate: faker.date.future(),
        startTime: '9:00 pm',
        title
      };
      this.agent = agent;
      endpoint = '/api/admin/events/';
    });

    afterEach(function() {
      return Promise.all([
        Event.remove(),
        Venue.remove(),
        User.remove()
      ]);
    });

    context('when the creator is an admin', function() {
      context('when using basic attributes', function() {
        let venue;

        beforeEach(function() {
          return establishSpecResources(agent, 'admin', createVenue)
            .then((newVenue) => {
              venue = newVenue;

              this.promise = agent
                .post(endpoint)
                .send({ ...baseParams, venue: venue._id });
            });
        });

        shared.itBehavesLike('a protected POST endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('creates the event', function() {
          return aValidEventCreation(this.promise, venue, title);
        });
      });

      context('when the event params has a weekly frequency', function() {
        let expectedDaysCreated;
        let holidays;
        let holidayValues;
        let startDate;
        let venue;

        beforeEach(function() {
          holidays = moment().holidays([
            'New Years Day',
            'Martin Luther King Jr. Day',
            'Valentine\'s Day',
            'Easter Sunday',
            'Memorial Day',
            'Mother\'s Day',
            'Father\'s Day',
            'Independence Day',
            'Halloween',
            'Thanksgiving Day',
            'Day after Thanksgiving',
            'Christmas Eve',
            'Christmas Day',
            'New Year\'s Eve'
          ]);
          startDate = moment().add(_.random(0, 6), 'days').format('MM-DD-YY');

          const eventDays = [];
          eventDays.push(moment(new Date(startDate)));

          // 26 total weeks (25 + original)
          for (let i = 1; i <= 25; i++) {
            eventDays.push(moment(new Date(startDate)).add(i, 'week'));
          }

          holidayValues = Object.values(holidays).map(h => h.valueOf());
          expectedDaysCreated = eventDays.filter((day) => {
            return !_.includes(holidayValues, day.valueOf());
          });

          return establishSpecResources(agent, 'admin', createVenue)
            .then((newVenue) => {
              venue = newVenue;
              const options = {
                ...baseParams,
                frequency: 'weekly',
                venue: venue._id
              };

              this.promise = agent
                .post(endpoint)
                .send(options);
            });
        });

        shared.itBehavesLike('a protected POST endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('creates the event', function() {
          return aValidEventCreation(this.promise, venue, title);
        });

        it('creates more events, all with different start dates', function() {
          return this.promise
            .then(() => Event.find({}))
            .then((events) => {
              const startDates = events.map(e => e.startDate);
              const testedStartDate = startDates[0];
              startDates.splice(startDates.indexOf(testedStartDate), 1);
              expect(events.length).to.eq(expectedDaysCreated.length);
              expect(startDates).not.to.include(testedStartDate);
            });
        });

        it('does not create the holidays', function() {
          return this.promise
            .then(() => Event.find({}))
            .then((events) => {
              const startDates = events.map(e => moment(e.startDate).valueOf());
              return startDates.forEach((date) => {
                expect(holidayValues).not.to.include(date);
              });
            });
        });
      });
    });

    context('when the user is a venueAdmin', function() {
      context('when the event being created belongs to a venue of that venueAdmin', function() {
        let venue;

        beforeEach(function() {
          const venuesCallback = (newAdmin) => {
            return createVenue({ venueAdmins: [newAdmin._id] });
          };

          return establishSpecResources(agent, 'venueAdmin', venuesCallback)
            .then((newVenue) => {
              venue = newVenue;

              this.promise = agent
                .post(endpoint)
                .send({ ...baseParams, venue: venue._id });
            });
        });

        shared.itBehavesLike('a protected POST endpoint');
        shared.itBehavesLike('a valid request', { statusCode: 201 });

        it('creates the event', function() {
          return aValidEventCreation(this.promise, venue, title);
        });
      });

      context('when the event being created does not belong to a venue of that venueAdmin', function() {
        let venue;

        beforeEach(function() {
          const venuesCallback = () => {
            return createVenue({ venueAdmins: [] });
          };

          return establishSpecResources(agent, 'venueAdmin', venuesCallback)
            .then((newVenue) => {
              venue = newVenue;

              this.promise = agent
                .post(endpoint)
                .send({ ...baseParams, venue: venue._id });
            });
        });

        shared.itBehavesLike('a protected POST endpoint');
        shared.itBehavesLike('an invalid request', { statusCode: 403 });

        it('does not create the event', function() {
          return this.promise
            .then(expect.fail)
            .catch(() => Event.findOne({ title }))
            .then((newEvent) => {
              expect(newEvent).not.to.exist;
            });
        });
      });
    });
  });
});
