import api from '../api';

function showAll(dataName, params = {}) {
  return api
    .get(`/${dataName}`, { params })
    .then(({ data }) => data[dataName]);
}

export default showAll;
