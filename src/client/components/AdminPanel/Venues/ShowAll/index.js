// Imports
import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';

// Services
import adminVenuesService from '../../../../services/admin/venues';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  updateVenues: PropTypes.func,
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

  componentWillMount() {
    return this.props.updateVenues();
  }

  componentWillUnmount() {
    return this.props.removeAlert();
  }

  handleDestroy(id) {
    event.preventDefault();

    return adminVenuesService
      .destroyVenue(id)
      .then(() => this.props.updateVenues())
      .then(() => {
        return this.props.setAlertMessage({ successMessage: 'Venue successfully deleted.' });
      });
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
                    <Link className="c-link o-grid__cell" to={`/admin/venues/all/${venue._id}/delete`}>destroy</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {this.props.children &&
          cloneElement(this.props.children, { ...this.props })}
      </div>
    );
  }
}

Venues.propTypes = propTypes;

export default Venues;
