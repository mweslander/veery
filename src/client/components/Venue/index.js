// Imports
import React, { PropTypes } from 'react';
import moment from 'moment';

// Components
import Favorite from '../Favorite';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  venue: PropTypes.object
};

/*
  Venue
  <Venue/>
*/

function getTime(time) {
  return moment(time).format('MMM Do');
}

const Venue = ({ venue }) => (
  <div className="venue">
    <Favorite />
    <div className="venue-details">
      <h2 className="venue-details__performance-type">{venue.event.title}</h2>
      <h3 className="venue-details__name">{venue.name}</h3>
      <address className="venue-details__address">
        <span>{venue.address}</span>
        <br />
        <span>{`${venue.city}, ${venue.state} ${venue.zipCode}`}</span>
      </address>
    </div>
    <div className="event-time">
      <h4 className="event-time__date">{getTime(venue.event.startDate)}</h4>
      <h4 className="event-time__time">{venue.event.startTime}</h4>
    </div>
  </div>
);

Venue.propTypes = propTypes;

export default Venue;
