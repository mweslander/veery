// Imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import LabelGroup from '../LabelGroup';
import DatePicker from '../../DatePicker';

// PropTypes
const propTypes = {
  event: PropTypes.object,
  handleChange: PropTypes.func,
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
          placeholder: 'Event Title',
          type: 'text',
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

      <div className="o-grid">
        <label className="c-label o-grid__cell" htmlFor="startDate">
          Start Date
          <DatePicker
            defaultDate={event.startDate || moment().add(1, 'day')}
          />
        </label>

        <LabelGroup
          classes="o-grid__cell c-event-form__start-time"
          name="startTime"
          options={{
            onChange: handleChange,
            placeholder: '10:00',
            type: 'text',
            value: event.startDate
          }}
        />
      </div>

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
