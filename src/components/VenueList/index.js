// Imports
import React from 'react';

// Components
import Venue from '../Venue';

// CSS
import './venue-list.scss';

/*
  VenueList
  <VenueList/>
*/

const VenueList = () => (
  <div className="venue-list">
    <button className="list-toggle">All</button>
    <ul className="list">
      <li className="list__item">
        <Venue />
      </li>
    </ul>
  </div>
);

export default VenueList;
