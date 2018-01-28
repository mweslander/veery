// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import LabelGroup from '../LabelGroup';

// PropTypes
const propTypes = {
  event: PropTypes.object,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  venues: PropTypes.array
};

/*
  EventForm
  <EventForm/>
*/

function EventForm({ handleChange, event, venues }) {
  const frequencies = ['one time', 'weekly', 'first of the month'];

  return (
    <div>
      <LabelGroup
        name="title"
        options={{
          onChange: handleChange,
          placeholder: "Event Title",
          type: "text",
          value: event.title
        }}
      />

      <label className="c-label" htmlFor="venue">
        Venue
        <select name="venue">
          {venues.map((venue) => {
            return (
              <option
                key={venue._id}
                value={venue._id}
              >{venue.name}</option>
            );
          })}
        </select>
      </label>

      <LabelGroup
        name="startDate"
        options={{
          onChange: handleChange,
          placeholder: "MM-DD-YY",
          type: "text",
          value: event.startDate
        }}
      />

      <LabelGroup
        name="startTime"
        options={{
          onChange: handleChange,
          placeholder: "10:00",
          type: "text",
          value: event.startDate
        }}
      />

      <label className="c-label" htmlFor="frequency">
        Frequency
        <select name="frequency">
          {frequencies.map((frequency) => {
            return (
              <option
                key={frequency}
                value={frequency}
              >{frequency}</option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

EventForm.propTypes = propTypes;

export default EventForm;
