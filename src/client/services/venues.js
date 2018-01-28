import api from './api';

function showAll() {
  return api
    .get('/venues')
    .then(({ data }) => data.venues);
}

export default {
  showAll
};
