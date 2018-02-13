// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import LabelGroup from '../LabelGroup';

// PropTypes
const propTypes = {
  handleChange: PropTypes.func,
  venue: PropTypes.object
};

/*
  VenueForm
  <VenueForm/>
*/

function VenueForm({ handleChange, venue }) {
  return (
    <div className="c-venue-form">
      <LabelGroup
        name="name"
        options={{
          onChange: handleChange,
          placeholder: 'IS JOHN CENA',
          type: 'text',
          value: venue.name
        }}
      />

      <LabelGroup
        name="address"
        options={{
          onChange: handleChange,
          placeholder: '316 Austin',
          type: 'text',
          value: venue.address
        }}
      />

      <div className="o-grid">
        <LabelGroup
          classes="o-grid__cell"
          name="city"
          options={{
            onChange: handleChange,
            placeholder: 'Where The Rock has come back to',
            type: 'text',
            value: venue.city
          }}
        />

        <LabelGroup
          classes="o-grid__cell o-grid__cell--offset-10"
          name="state"
          options={{
            onChange: handleChange,
            placeholder: 'Solid',
            type: 'text',
            value: venue.state
          }}
        />
      </div>

      <LabelGroup
        name="zipCode"
        options={{
          onChange: handleChange,
          placeholder: '23456',
          type: 'number',
          value: venue.zipCode
        }}
      />
    </div>
  );
}

VenueForm.propTypes = propTypes;

export default VenueForm;
