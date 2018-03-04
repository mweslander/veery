'use strict';

const Event = require('../models/event');
const Venue = require('../models/venue');
const {
  app,
  createEvent,
  createVenue,
  shared
} = require('../../../../support/spec/specHelper');

function establishSpecResources(agent, extraEvents = () => []) {
  const promises = [];

  for (let i = 10; i > 0; i--) {
    promises.push(createVenue());
  }

  return Promise.all(promises)
    .then((venues) => {
      const eventPromises = [];

      for (let i = 0; i > 0; i--) {
        eventPromises.push(createEvent({ venue: venues[0]._id }));
        eventPromises.push(createEvent({ venue: venues[1]._id }));
      }

      return Promise.all(_.flatten([eventPromises, extraEvents(venues)]));
    });
}

function aValidEventShowAll(promise) {
  let events;

  return Event
    .find({})
    .lean()
    .then((allEvents) => {
      events = allEvents;
      return promise;
    })
    .then(({ body }) => {
      expect(body.events.length).to.eq(events.length);
    });
}

describe('event requests', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('GET /events', function() {
    let agent;
    let endpoint;

    beforeEach(function() {
      agent = apiRequest(app);
      this.agent = agent;
      endpoint = '/api/events';
    });

    afterEach(function() {
      return Promise.all([
        Event.remove(),
        Venue.remove()
      ]);
    });

    beforeEach(function() {
      return establishSpecResources(agent)
        .then(() => {
          this.promise = agent
            .get(endpoint);
        });
    });

    shared.itBehavesLike('a valid request', { statusCode: 200 });

    it('returns all the events', function() {
      return aValidEventShowAll(this.promise);
    });
  });
});
