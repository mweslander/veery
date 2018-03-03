import api from './api';

function showAll(params) {
  return api
    .get('/venues', { params })
    .then(({ data }) => data.venues);
}

export default {
  showAll
};
