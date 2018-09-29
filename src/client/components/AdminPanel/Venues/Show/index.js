// Imports
import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';

// Components
import EventsTable from '../../../Base/EventsTable';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  isMobileScreen: PropTypes.bool,
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    params: {
      id: PropTypes.string
    },
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  updateEvents: PropTypes.func,
  updateVenues: PropTypes.func,
  venues: PropTypes.array
};

/*
  Venue
  <Venue/>
*/

class Venue extends Component {
  componentWillUnmount() {
    return this.props.removeAlert();
  }

  render() {
    const { venue } = this.props;

    return (
      <div className="c-admin-venues-show">
        <div className="c-admin-venues-show__info-header o-grid">
          <div className="c-admin-venues-show__info o-grid__cell o-grid__cell--width-40">
            <h2 className="c-admin-venues-show__heading c-heading">{venue.name}</h2>
            <h4 className="c-admin-venues-show__heading c-heading">{venue.address}</h4>
            <h4 className="c-admin-venues-show__heading c-heading">{venue.city}, {venue.state}</h4>
          </div>

          <div className="c-admin-venues-show__buttons o-grid__cell o-grid__cell--width-30">
            <Link
              className="c-admin-venues-show__button c-button c-button--brand"
              to={`/admin/venues/${venue._id}/edit`}
            >Edit</Link>

            <Link
              className="c-admin-venues-show__button c-button c-button--brand"
              to="/admin/events/new"
            >Add a New Event</Link>
          </div>
        </div>

        <h2 className="c-admin-venues-show__events-heading c-heading">Events</h2>

        <EventsTable
          events={venue.events}
          fromVenue
          isMobileScreen={this.props.isMobileScreen}
        />

        {this.props.children &&
          cloneElement(this.props.children, {
            events: venue.events,
            handleUpdate: this.props.updateVenues,
            setAlertMessage: this.props.setAlertMessage
          })}
      </div>
    );
  }
}

Venue.propTypes = propTypes;

export default Venue;
