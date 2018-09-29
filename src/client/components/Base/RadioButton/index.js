// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  explanationText: PropTypes.string,
  id: PropTypes.string,
  input: PropTypes.object
};

function RadioButton({ explanationText, id, inputProps }) {
  return (
    <div className="c-radio-button">
      <label className="c-label" htmlFor={id}>
        <input
          id={id}
          type="radio"
          {...inputProps}
        />

        <span className="c-radio-button__explanation">{explanationText}</span>
      </label>
    </div>
  );
}

RadioButton.propTypes = propTypes;

export default RadioButton;
