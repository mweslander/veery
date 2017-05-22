// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Scroll from 'react-scroll';

// Components
import Favorite from '../Favorite';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  event: PropTypes.object,
  focusedVenueId: PropTypes.string
};

/*
  Event
  <Event/>
*/

const Element = Scroll.Element;

function getTime(time) {
  return moment(time).format('MMM Do');
}

function Event({ event, focusedVenueId }) {
  const isFocusedVenue = event.venue._id === focusedVenueId;
  const eventClass = classNames('event', { 'event--focused': isFocusedVenue });

  return (
    <Element name={event._id} className={eventClass}>
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
    </Element>
  );
}

Event.propTypes = propTypes;

export default Event;
