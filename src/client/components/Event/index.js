// Imports
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Scroll from 'react-scroll';

// Components
import EventIcons from '../EventIcons';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  event: PropTypes.object,
  focusedVenue: PropTypes.object,
  updateFocusedVenue: PropTypes.func
};

/*
  Event
  <Event/>
*/

const Element = Scroll.Element;

function getTime(time) {
  return moment(time).format('MMM Do');
}

function Event({ event, focusedVenue, updateFocusedVenue }) {
  const isFocusedVenue = event.venue._id === focusedVenue._id;
  const eventClass = classNames('c-event__container', { 'c-event__container--focused': isFocusedVenue });

  return (
    <Element name={event._id} className={eventClass}>
      <div
        onClick={() => { updateFocusedVenue(event.venue, event); }}
        className="c-event"
      >
        <EventIcons event={event} />

        <div className="c-event__info-container">
          <h2 className="c-event__performance-type">{event.title}</h2>
          <h3 className="c-event__name">{event.venue.name}</h3>

          <address className="c-event__address">
            <span>{event.venue.address}</span>
            <br />
            <span>{`${event.venue.city}, ${event.venue.state} ${event.venue.zipCode}`}</span>
          </address>
        </div>

        <div className="c-event__time">
          <h4 className="c-event__heading">{getTime(event.startDate)}</h4>
          <h4 className="c-event__heading">{event.startTime}</h4>
        </div>
      </div>
    </Element>
  );
}

Event.propTypes = propTypes;

export default Event;
