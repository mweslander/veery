import api from '../api';

function createVenue(params) {
  return api
    .post('/admin/venues', params)
    .then(({ data }) => data.venue);
}

function destroyVenue(id) {
  return api
    .delete(`/admin/venues/${id}`);
}

function showAll() {
  return api
    .get('/admin/venues')
    .then(({ data }) => data.venues);
}

function updateVenue(params, route) {
  return api
    .put(route, params)
    .then(({ data }) => data.venue);
}

export default {
  createVenue,
  destroyVenue,
  showAll,
  updateVenue
};
