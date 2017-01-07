import api from './api';

function getAll() {
  return api
    .get('/venues')
    .then(({ data }) => data.venues);
}

export default {
  getAll
};
