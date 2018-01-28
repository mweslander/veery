// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  value: PropTypes.string
};

function Button(props) {
  return (
    <input className="c-button" type="submit" {...props} />
  );
}

Button.propTypes = propTypes;

export default Button;
