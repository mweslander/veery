import api from './api';

function isSignedIn() {
  return api
    .get('/is-signed-in');
}

function signIn(params) {
  return api
    .post('/sign-in', params);
}

function signOut() {
  return api
    .get('/sign-out');
}

export default {
  isSignedIn,
  signIn,
  signOut
};
