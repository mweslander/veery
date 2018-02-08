// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  classes: PropTypes.string,
  value: PropTypes.string
};

function Button({ value, classes }) {
  return (
    <input className={`c-button ${classes}`} type="submit" value={value} />
  );
}

Button.propTypes = propTypes;

export default Button;
