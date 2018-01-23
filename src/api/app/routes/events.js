'use strict';

const EventsController = require('../controllers/events');

module.exports = function(api) {
  api.get('/events', EventsController.showAll);
};
