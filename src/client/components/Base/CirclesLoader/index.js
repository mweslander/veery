// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  color: PropTypes.string
};

function CirclesLoader({ color }) {
  const defaultColor = color || '#042B63';

  return (
    <div className="c-circles-loader__container">
      <svg className="c-circles-loader" version="1.1" id="L4" x="0px" y="0px"
        viewBox="0 0 100 100" enableBackground="new 0 0 0 0" >
        <circle fill={defaultColor} stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>
        </circle>
        <circle fill={defaultColor} stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"/>
        </circle>
        <circle fill={defaultColor} stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"/>
        </circle>
      </svg>
    </div>
  );
}

CirclesLoader.propTypes = propTypes;

export default CirclesLoader;
