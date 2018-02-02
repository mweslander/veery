import api from '../api';

function createEvent(params) {
  return api
    .post('/admin/events', params)
    .then(({ data }) => data.event);
}

function destroyEvent(id, params = {}) {
  // Axios wants(?) you to pass an object with a key of params
  // https://github.com/axios/axios/issues/424
  return api
    .delete(`/admin/events/${id}`, { params });
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
