import api from './api';

function forgotPassword(params) {
  return api
    .post('/forgot-password', params);
}

function isSignedIn() {
  return api
    .get('/is-signed-in');
}

function register(params) {
  return api
    .post('/register', params);
}

function resetPassword(params, token) {
  return api
    .put(`/reset-password/${token}`, params);
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
  forgotPassword,
  isSignedIn,
  register,
  resetPassword,
  signIn,
  signOut
};
