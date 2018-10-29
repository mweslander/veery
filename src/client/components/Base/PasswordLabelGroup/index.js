// Imports
import React from 'react';
import PropTypes from 'prop-types';

// PropTypes
const propTypes = {
  inputName: PropTypes.string,
  labelText: PropTypes.string
};

function PasswordLabelGroup({ inputName, labelText }) {
  return (
    <label className="c-label" htmlFor="password">
      {labelText}
      <input
        className="c-field o-grid__cell"
        name={inputName}
        type="password"
        placeholder="password"
      />
    </label>
  );
}

PasswordLabelGroup.propTypes = propTypes;

export default PasswordLabelGroup;
