import PropTypes from 'prop-types';

const propTypes = {
  router: PropTypes.shape({
    location: PropTypes.shape({
      query: PropTypes.shape({
        token: PropTypes.string
      })
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

export default propTypes;
