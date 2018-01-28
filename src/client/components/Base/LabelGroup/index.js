// Imports
import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

// PropTypes
const propTypes = {
  classes: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.object
};

/*
  LabelGroup
  <LabelGroup/>
*/

function LabelGroup({ classes, name, options = {} }) {
  return (
    <label className={`c-label ${classes}`} htmlFor={name}>
      {capitalize(name)}
      <input className="c-field" name={name} {...options} />
    </label>
  );
}

LabelGroup.propTypes = propTypes;

export default LabelGroup;
