import api from './api';

// TODO: should be showall
function getAll() {
  return api
    .get('/venues')
    .then(({ data }) => data.venues);
}

export default {
  getAll
};
