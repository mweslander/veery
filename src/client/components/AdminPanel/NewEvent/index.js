// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Services
import eventsService from '../../../services/events';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  venues: PropTypes.array
};

/*
  NewEvent
  <NewEvent/>
*/

class NewEvent extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newEventForm.elements);

    return eventsService
      .createEvent(values)
      .then(() => this.props.router.push('/admin/events'));
  }

  render() {
    return (
      <form
        className="new-event o-fieldset o-container o-container--small"
        ref={(form) => { this.newEventForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className="c-label" htmlFor="venue">
          Venue
          <select name="venue">
            {this.props.venues.map((venue) => {
              return (
                <option
                  key={venue._id}
                  value={venue._id}
                >{venue.name}</option>
              );
            })}
          </select>
        </label>
        <label className="c-label" htmlFor="startDate">
          Start Date
          <input className="c-field" name="startDate" type="text" placeholder="MM-DD-YY" />
        </label>
        <label className="c-label" htmlFor="startTime">
          Start Time
          <input className="c-field" name="startTime" type="text" placeholder="10:00" />
        </label>
        <label className="c-label" htmlFor="title">
          Title
          <input className="c-field" name="title" type="text" placeholder="event title" />
        </label>
        <label className="c-label" htmlFor="type">
          Type
          <input className="c-field" name="type" type="text" placeholder="open" />
        </label>
        <input className="c-button" type="submit" value="Create Event" />
      </form>
    );
  }
}

NewEvent.propTypes = propTypes;

export default NewEvent;
