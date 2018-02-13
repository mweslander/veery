// Imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Event from '../Event';
import Footer from '../Footer';

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
    <div className="c-event-list__container">
      <button className="c-event-list__toggle">All</button>
      <ul className="c-event-list element" id="containerElement">
        <li className="c-event-list__item">
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

      <Footer />
    </div>
  );
}

EventList.propTypes = propTypes;

export default EventList;
