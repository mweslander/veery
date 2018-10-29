import adminPOST from '../helpers/adminPOST';
import api from '../api';

function createEvent(params) {
  return adminPOST('event', params);
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
