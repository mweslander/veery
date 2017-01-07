// Imports
import React, { PropTypes } from 'react';

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

const Venue = ({ venue }) => (
  <div className="venue">
    <Favorite />
    <div className="venue-details">
      <h2 className="venue-details__performance-type">{venue.eventTitle}</h2>
      <h3 className="venue-details__name">{venue.name}</h3>
      <address className="venue-details__address">
        <span>{venue.address}</span>
        <br />
        <span>{`${venue.city}, ${venue.state} ${venue.zipCode}`}</span>
      </address>
    </div>
    <div className="event-time">
      <h4 className="event-time__start">{venue.eventStart}</h4>
      <h4 className="event-time__end">{venue.eventEnd}</h4>
    </div>
  </div>
);

Venue.propTypes = propTypes;

export default Venue;
