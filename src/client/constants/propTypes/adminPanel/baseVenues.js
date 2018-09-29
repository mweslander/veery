import PropTypes from 'prop-types';

const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  venues: PropTypes.array
};

export default propTypes;
