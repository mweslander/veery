import api from './api';

function createVenue(params) {
  return api
    .post('/venues', params)
    .then(({ data }) => data.venue);
}

function destroyVenue(id) {
  return api
    .delete(`/venues/${id}`);
}

function getAll() {
  return api
    .get('/venues')
    .then(({ data }) => data.venues);
}

export default {
  createVenue,
  destroyVenue,
  getAll
};
