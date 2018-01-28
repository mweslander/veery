// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';

// Services
import adminEventsService from '../../../../services/admin/events';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  events: PropTypes.array
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
    return adminEventsService.showAll()
      .then((events) => {
        this.setState({ events });
      });
  }

  handleDestroy(id) {
    event.preventDefault();

    return adminEventsService
      .destroyEvent(id)
      .then(() => window.location.reload());
  }

  render() {
    return (
      <div className="c-admin-show-all">
        <Link className="c-admin-show-all__link c-button c-button--brand" to="/admin/events/new">Add a New Event</Link>
        <table className="c-table c-table--striped">
          <thead className="c-table__head">
            <tr className="c-table__row c-table__row--heading">
              <th className="c-table__cell">Title</th>
              <th className="c-table__cell">Start Date</th>
              <th className="c-table__cell">Start Time</th>
              <th className="c-table__cell">Venue</th>
              <th className="c-table__cell" />
            </tr>
          </thead>

          <tbody className="c-table__body">
            {this.state.events.map((event) => {
              return (
                <tr
                 key={event._id}
                  className="c-table__row"
                >
                  <td className="c-table__cell">{event.title}</td>
                  <td className="c-table__cell">{event.startDate}</td>
                  <td className="c-table__cell">{event.startTime}</td>
                  <td className="c-table__cell">
                    <Link className="c-link" to={`/admin/venues/${event.venue._id}/edit`}>{event.venue.name}</Link>
                  </td>
                  <td className="c-table__cell o-grid">
                    <Link className="c-link o-grid__cell" to={`/admin/events/${event._id}/edit`}>Edit</Link>
                    <a
                      className="c-link o-grid__cell"
                      onClick={() => this.handleDestroy(event._id)}
                    >destroy</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Events.propTypes = propTypes;

export default Events;
