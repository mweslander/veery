// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import LabelGroup from '../LabelGroup';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  venue: PropTypes.object
};

/*
  VenueForm
  <VenueForm/>
*/

function VenueForm({ handleChange, venue }) {
  return (
    <div>
      <LabelGroup
        name="name"
        options={{
          onChange: handleChange,
          placeholder: "IS JOHN CENA",
          type: "text",
          value: venue.name
        }}
      />

      <LabelGroup
        name="address"
        options={{
          onChange: handleChange,
          placeholder: "316 Austin",
          type: "text",
          value: venue.address
        }}
      />

      <div className="o-grid">
        <LabelGroup
          classes="o-grid__cell"
          name="city"
          options={{
            onChange: handleChange,
            placeholder: "Where The Rock has come back to",
            type: "text",
            value: venue.city
          }}
        />

        <LabelGroup
          classes="o-grid__cell o-grid__cell--offset-10"
          name="state"
          options={{
            onChange: handleChange,
            placeholder: "Solid",
            type: "text",
            value: venue.state
          }}
        />
      </div>

      <LabelGroup
        name="zipCode"
        options={{
          onChange: handleChange,
          placeholder: "23456",
          type: "number",
          value: venue.zipCode
        }}
      />

      <LabelGroup
        name="latitude"
        options={{
          onChange: handleChange,
          placeholder: "34.12345",
          step: "0.000001",
          type: "number",
          value: venue.latitude
        }}
      />

      <LabelGroup
        name="longitude"
        options={{
          onChange: handleChange,
          placeholder: "-78.42069",
          step: "0.000001",
          type: "number",
          value: venue.longitude
        }}
      />
    </div>
  );
}

VenueForm.propTypes = propTypes;

export default VenueForm;
