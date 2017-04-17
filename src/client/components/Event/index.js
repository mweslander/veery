// Imports
import React, { PropTypes } from 'react';
import moment from 'moment';

// Components
import Favorite from '../Favorite';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  event: PropTypes.object
};

/*
  Event
  <Event/>
*/

function getTime(time) {
  return moment(time).format('MMM Do');
}

function Event({ event }) {
  return (
    <div className="event">
      <Favorite />
      <div className="event-details">
        <h2 className="event-details__performance-type">{event.title}</h2>
        <h3 className="event-details__name">{event.venue.name}</h3>
        <address className="event-details__address">
          <span>{event.venue.address}</span>
          <br />
          <span>{`${event.venue.city}, ${event.venue.state} ${event.venue.zipCode}`}</span>
        </address>
      </div>
      <div className="event-time">
        <h4 className="event-time__date">{getTime(event.startDate)}</h4>
        <h4 className="event-time__time">{event.startTime}</h4>
      </div>
    </div>
  );
}

Event.propTypes = propTypes;

export default Event;
