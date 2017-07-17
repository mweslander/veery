'use strict';

const authentication = require('../../config/middlewares/authentication');
const EventsController = require('../controllers/events');

module.exports = function(api) {
  api.get('/events', EventsController.index);
  api.post('/events', authentication.requireLoggedInUser, EventsController.create);
  api.delete('/events/:id', authentication.requireLoggedInUser, EventsController.destroy);
};
