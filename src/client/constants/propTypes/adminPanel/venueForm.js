import PropTypes from 'prop-types';

const propTypes = {
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

export default propTypes;
