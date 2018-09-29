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
          placeholder: 'IS JOHN CENA',
          type: 'text',
          defaultValue: venue.name
        }}
      />

      <LabelGroup
        name="address"
        options={{
          placeholder: '316 Austin',
          type: 'text',
          defaultValue: venue.address
        }}
      />

      <div className="o-grid">
        <LabelGroup
          classes={{
            label: 'o-grid__cell'
          }}
          name="city"
          options={{
            placeholder: 'Where The Rock has come back to',
            type: 'text',
            defaultValue: venue.city
          }}
        />

        <LabelGroup
          classes={{
            label: 'o-grid__cell c-venue-form__state'
          }}
          name="state"
          options={{
            placeholder: 'Solid',
            type: 'text',
            defaultValue: venue.state
          }}
        />
      </div>

      <LabelGroup
        name="zipCode"
        options={{
          placeholder: '23456',
          type: 'number',
          defaultValue: venue.zipCode
        }}
      />
    </div>
  );
}

VenueForm.propTypes = propTypes;

export default VenueForm;
