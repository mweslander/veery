import adminPOST from '../helpers/adminPOST';

function inviteVenueAdmin(params) {
  return adminPOST('invitation', params);
}

export default {
  inviteVenueAdmin
};
