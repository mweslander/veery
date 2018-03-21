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
import HomeLink from '../../HomeLink';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  events: PropTypes.array,
  isMobileScreen: PropTypes.bool,
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  updateEvents: PropTypes.func,
  updateVenues: PropTypes.func
};

/*
  Events
  <Events/>
*/

class Events extends Component {
  componentWillMount() {
    return this.props.updateEvents();
  }

  componentWillUnmount() {
    return this.props.removeAlert();
  }

  render() {
    return (
      <div className="c-admin-events-show-all">
        <HomeLink />

        <Link className="c-admin-events-show-all__link c-button c-button--brand" to="/admin/events/new">Add a New Event</Link>

        <EventsTable
          events={this.props.events}
          isMobileScreen={this.props.isMobileScreen}
        />

        {this.props.children &&
          cloneElement(this.props.children, {
            events: this.props.events,
            handleUpdate: this.props.updateEvents,
            setAlertMessage: this.props.setAlertMessage
          })}
      </div>
    );
  }
}

Events.propTypes = propTypes;

export default Events;
