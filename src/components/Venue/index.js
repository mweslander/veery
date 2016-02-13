// Imports
import React from 'react';

// Components
import Favorite from '../Favorite';

// CSS
import './venue.scss';

/*
  VenueList
  <VenueList/>
*/

const VenueList = () => (
  <div className="venue">
    <Favorite />
    <div className="venue-details">
      <h2 className="venue-details__performance-type">Open Jam</h2>
      <h3 className="venue-details__name">The Social Gameroom</h3>
      <address className="venue-details__address">
        1007 W Main St.<br/>
        Durham, NC 27705
      </address>
    </div>
    <div className="event-time">
      <h4 className="event-time__start">10</h4>
      <h4 className="event-time__end">2</h4>
    </div>
  </div>
);

export default VenueList;
