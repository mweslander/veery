import adminPOST from '../helpers/adminPOST';
import api from '../api';

function createVenue(params) {
  return adminPOST('venue', params);
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
