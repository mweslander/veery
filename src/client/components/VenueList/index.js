// Imports
import React, { PropTypes } from 'react';

// Components
import Venue from '../Venue';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  venues: PropTypes.array
};

/*
  VenueList
  <VenueList/>
*/

const VenueList = ({ venues }) => (
  <div className="venue-list">
    <button className="list-toggle">All</button>
    <ul className="list">
      <li className="list__item">
        {venues.map((venue) => {
          return <Venue key={venue._id} venue={venue} />;
        })}
      </li>
    </ul>
  </div>
);

VenueList.propTypes = propTypes;

export default VenueList;
