// Imports
import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Images
import ageLogo from '../../img/21+-logo.png';

// PropTypes
const propTypes = {
  event: PropTypes.object
};

/*
  EventIcons
  <EventIcons/>
*/

function EventIcons({ event }) {
  if (event.ageRestriction || event.cover) {
    return (
      <div className="c-event-icons__container">
        {event.ageRestriction &&
          <img
            alt="Only 21+"
            className="c-event-icons__icon"
            src={ageLogo}
            title="Must be 21 or older to enter"
          />}
        {event.cover &&
          <i
            alt="Cover charge"
            className="c-event-icons__icon c-event-icons__dollar-icon fa fa-usd"
            title="Cover charge at the door"
          />}
      </div>
    );
  }

  return null;
}

EventIcons.propTypes = propTypes;

export default EventIcons;
