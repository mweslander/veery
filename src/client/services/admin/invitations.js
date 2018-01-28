import api from '../api';

function inviteVenueAdmin(params) {
  return api
    .post('/admin/invitations', params)
    .then(({ data }) => data.invitation);
}

export default {
  inviteVenueAdmin
};
