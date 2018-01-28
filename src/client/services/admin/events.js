import api from '../api';

function createEvent(params) {
  return api
    .post('/admin/events', params)
    .then(({ data }) => data.event);
}

function destroyEvent(id) {
  return api
    .delete(`/admin/events/${id}`);
}

function showAll() {
  return api
    .get('/admin/events')
    .then(({ data }) => data.events);
}

export default {
  createEvent,
  destroyEvent,
  showAll
};
