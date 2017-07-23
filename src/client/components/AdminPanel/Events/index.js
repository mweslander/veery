// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Services
import eventsService from '../../../services/events';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  events: PropTypes.array,
  venues: PropTypes.array
};

/*
  Events
  <Events/>
*/

class Events extends Component {
  constructor() {
    super();

    this.handleDestroy = this.handleDestroy.bind(this);
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    return eventsService.getAll()
      .then((events) => {
        this.setState({ events });
      });
  }

  handleDestroy(id) {
    event.preventDefault();

    return eventsService
      .destroyEvent(id)
      .then(() => window.location.reload());
  }

  render() {
    return (
      <ul className="c-list c-list--unstyled">
        {this.state.events.map((event) => {
          return (
            <li
              key={event._id}
              className="c-list__item o-grid"
            >
              <p className="c-paragraph o-grid__cell">
                {event.title}
              </p>
              <p className="c-paragraph o-grid__cell">
                {event.startDate}
              </p>
              <p className="c-paragraph o-grid__cell">
                {event.startTime}
              </p>
              <a
                className="c-link c-paragraph o-grid__cell"
                onClick={() => this.handleDestroy(event._id)}
              >Destroy</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

Events.propTypes = propTypes;

export default Events;
