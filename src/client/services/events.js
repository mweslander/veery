import api from './api';

function getAll() {
  return api
    .get('/events')
    .then(({ data }) => data.events);
}

export default {
  getAll
};
