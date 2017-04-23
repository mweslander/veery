// Imports
import React, { PropTypes } from 'react';

// Components
import Event from '../Event';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  events: PropTypes.array
};

/*
  EventList
  <EventList/>
*/

function EventList({ events }) {
  return (
    <div className="event-list">
      <button className="list-toggle">All</button>
      <ul className="list">
        <li className="list__item">
          {events.map((event) => {
            return <Event key={event._id} event={event} />;
          })}
        </li>
      </ul>
    </div>
  );
}

EventList.propTypes = propTypes;

export default EventList;
