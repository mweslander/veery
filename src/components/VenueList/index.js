// Imports
import React from 'react';

// Components
import Venue from '../Venue';

// CSS
import './index.scss';

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
        <Venue />
        <Venue />
        <Venue />
        <Venue />
      </li>
    </ul>
  </div>
);

export default VenueList;
