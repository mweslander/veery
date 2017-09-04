// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Event from '../Event';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  events: PropTypes.array,
  focusedVenue: PropTypes.object,
  updateFocusedVenue: PropTypes.func
};

/*
  EventList
  <EventList/>
*/

function EventList({ events, focusedVenue, updateFocusedVenue }) {
  return (
    <div className="event-list">
      <button className="list-toggle">All</button>
      <ul className="list element" id="containerElement">
        <li className="list__item">
          {events.map((event) => {
            return (
              <Event
                event={event}
                focusedVenue={focusedVenue}
                key={event._id}
                updateFocusedVenue={updateFocusedVenue}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
}

EventList.propTypes = propTypes;

export default EventList;
