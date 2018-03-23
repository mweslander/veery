// Imports
import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';

// PropTypes
const propTypes = {
  classes: PropTypes.object,
  displayName: PropTypes.string,
  row: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.object
};

// CSS
import './index.scss';

/*
  LabelGroup
  <LabelGroup/>
*/

function LabelGroup(props) {
  const {
    classes = {},
    displayName,
    name,
    options = {},
    row
  } = props;

  if (row) {
    return (
      <div className="c-label-group--row o-grid" htmlFor={name}>
        <label className={`c-label o-grid__cell ${classes.label}`} htmlFor={name}>
          {displayName || startCase(name)}
        </label>
        <input className={`c-field o-grid__cell ${classes.input}`} name={name} {...options} />
      </div>
    );
  }

  return (
    <label className={`c-label ${classes.label}`} htmlFor={name}>
      {displayName || startCase(name)}
      <input className={`c-field ${classes.input}`} name={name} {...options} />
    </label>
  );
}

LabelGroup.propTypes = propTypes;

export default LabelGroup;
