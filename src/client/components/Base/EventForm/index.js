// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import DatePicker from '../../DatePicker';
import LabelGroup from '../LabelGroup';
import TimePicker from '../../TimePicker';
// PropTypes
const propTypes = {
  event: PropTypes.object,
  handleStartDateChange: PropTypes.func,
  venues: PropTypes.array
};

// CSS
import './index.scss';

/*
  EventForm
  <EventForm/>
*/

function EventForm({ handleStartDateChange, event, venues }) {
  const frequencies = ['one time', 'weekly', 'first of the month'];

  return (
    <div className="c-event-form">
      <LabelGroup
        name="title"
        options={{
          placeholder: 'Event Title',
          type: 'text',
          value: event.title
        }}
      />

      <label className="c-label" htmlFor="venue">
        <span className="c-event-form__field-description">Venue:</span>
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
            defaultDate={event.startDate}
            handleStartDateChange={handleStartDateChange}
          />
        </label>

        <label className="c-label o-grid__cell o-grid__cell--offset-20" htmlFor="startDate">
          Start Time
          <TimePicker
            defaultTime={event.startTime}
          />
        </label>
      </div>

      <div>
        <label className="c-label" htmlFor="frequency">
          <span className="c-event-form__field-description">Frequency:</span>
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
        <div className="c-event-form__disclaimer">
          * - you'll have to use the "one time" frequency if you want to add an event that occurs on a holiday
        </div>
      </div>
    </div>
  );
}

EventForm.propTypes = propTypes;

export default EventForm;
