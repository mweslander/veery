import api from '../api';

function adminPOST(dataName, params) {
  return api
    .post(`/admin/${dataName}s`, params)
    .then(({ data }) => data[dataName]);
}

export default adminPOST;
