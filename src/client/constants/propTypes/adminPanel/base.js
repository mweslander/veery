import PropTypes from 'prop-types';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}

export default propTypes;
