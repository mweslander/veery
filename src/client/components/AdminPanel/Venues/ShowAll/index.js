// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';

// Components
import Button from '../../../Base/Button';

// Services
import adminVenuesService from '../../../../services/admin/venues';

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

    return adminVenuesService
      .destroyVenue(id)
      // TODO: probably don't need to pass this as a callback
      .then(() => window.location.reload());
  }

  render() {
    return (
      <div className="c-admin-show-all">
        <Link className="c-admin-show-all__link c-button c-button--brand" to="/admin/venues/new">Add a New Venue</Link>
        <table className="c-table c-table--striped">
          <thead className="c-table__head">
            <tr className="c-table__row c-table__row--heading">
              <th className="c-table__cell">Name</th>
              <th className="c-table__cell" />
              <th className="c-table__cell" />
            </tr>
          </thead>

          <tbody className="c-table__body">
            {this.props.venues.map((venue) => {
              return (
                <tr
                  key={venue._id}
                  className="c-table__row"
                >
                  <td className="c-table__cell">{venue.name}</td>
                  <td className="c-table__cell" />
                  <td className="c-table__cell o-grid">
                    <Link className="c-link o-grid__cell" to={`/admin/venues/${venue._id}/edit`}>Edit</Link>
                    <a
                      className="c-link o-grid__cell"
                      onClick={() => this.handleDestroy(venue._id)}
                    >destroy</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Venues.propTypes = propTypes;

export default Venues;
