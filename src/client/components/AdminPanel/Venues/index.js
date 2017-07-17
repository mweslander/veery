// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Services
import venuesService from '../../../services/venues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  venues: PropTypes.array
};

/*
  Venues
  <Venues/>
*/

class Venues extends Component {
  constructor() {
    super();

    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleDestroy(id) {
    event.preventDefault();

    return venuesService
      .destroyVenue(id)
      .then(() => window.location.reload());
  }

  render() {
    return (
      <ul className="c-list c-list--unstyled">
        {this.props.venues.map((venue) => {
          return (
            <li
              key={venue._id}
              className="-list__item o-grid"
            >
              <p className="c-paragraph o-grid__cell">
                {venue.name}
              </p>
              <a
                className="c-link c-paragraph o-grid__cell"
                onClick={() => this.handleDestroy(venue._id)}
              >destroy</a>
            </li>
          );
        })}
      </ul>
    );
  }
}

Venues.propTypes = propTypes;

export default Venues;
