// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  classes: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string
};

function Button({ classes, disabled, value }) {
  return (
    <input
      className={`c-button ${classes}`}
      disabled={disabled}
      type="submit"
      value={value}
    />
  );
}

Button.propTypes = propTypes;

export default Button;
