import axios from 'axios';

function init() {
  const api = axios.create({
    baseURL: '/api'
  });

  return api;
}

export default init();
