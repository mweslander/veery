import api from './api';

function createEvent(params) {
  return api
    .post('/events', params)
    .then(({ data }) => data.event);
}

function destroyEvent(id) {
  return api
    .delete(`/events/${id}`);
}

function getAll() {
  return api
    .get('/events')
    .then(({ data }) => data.events);
}

export default {
  createEvent,
  destroyEvent,
  getAll
};
