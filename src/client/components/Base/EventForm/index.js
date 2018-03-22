// Imports
import React, {
  Component
} from 'react';
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

class EventForm extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      amountOfEventsShowing: false
    };
  }

  handleChange(e) {
    let amountOfEventsShowing = false;

    if (e.target.value === 'weekly') {
      amountOfEventsShowing = true;
    }

    return this.setState({ amountOfEventsShowing });
  }

  render() {
    const { handleStartDateChange, event, venues } = this.props;
    const FREQUENCIES = ['one time', 'weekly'];

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
          <div>
            <label className="c-label" htmlFor="frequency">
              <span className="c-event-form__field-description">Frequency*:</span>
              <select onChange={this.handleChange} className="c-event-form__select-field" name="frequency">
                {FREQUENCIES.map((frequency) => {
                  return (
                    <option
                      key={frequency}
                      value={frequency}
                    >{frequency}</option>
                  );
                })}
              </select>
            </label>

            {this.state.amountOfEventsShowing &&
              <LabelGroup
                displayName="For How Many Weeks?"
                classes={{
                  input: 'c-event-form__amount-of-events-input o-grid__cell--width-15',
                  label: 'c-event-form__amount-of-events-field o-grid__cell--width-40'
                }}
                name="amountOfWeeks"
                options={{
                  max: '104',
                  type: 'number'
                }}
                row
              />}
          </div>

          <div className="c-event-form__disclaimer">
            * - you'll have to use the "one time" frequency if you want to add an event that occurs on a holiday
          </div>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = propTypes;

export default EventForm;
