import api from './api';

function showAll() {
  return api
    .get('/events')
    .then(({ data }) => data.events);
}

export default {
  showAll
};
