// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Services
import venuesService from '../../../services/venues';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

/*
  NewVenue
  <NewVenue/>
*/

class NewVenue extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newVenueForm.elements);

    return venuesService
      .createVenue(values)
      .then(() => this.props.router.push('/admin'));
  }

  render() {
    return (
      <form
        className="new-venue o-fieldset o-container o-container--small"
        ref={(form) => { this.newVenueForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className="c-label" htmlFor="address">
          Address
          <input className="c-field" name="address" type="text" placeholder="316 Austin" />
        </label>
        <label className="c-label" htmlFor="city">
          City
          <input className="c-field" name="city" type="text" placeholder="Where the Rock has come back to" />
        </label>
        <label className="c-label" htmlFor="latitude">
          Latitude
          <input className="c-field" name="latitude" step="0.000000000000001" type="number" placeholder="341234123.234" />
        </label>
        <label className="c-label" htmlFor="longitude">
          Longitude
          <input className="c-field" name="longitude" step="0.000000000000001" type="number" placeholder="598595.55" />
        </label>
        <label className="c-label" htmlFor="name">
          Name
          <input className="c-field" name="name" type="text" placeholder="IS JOHN CENA" />
        </label>
        <label className="c-label" htmlFor="state">
          State
          <input className="c-field" name="state" type="text" placeholder="solid" />
        </label>
        <label className="c-label" htmlFor="zipCode">
          Zip Code
          <input className="c-field" name="zipCode" type="number" placeholder="23333" />
        </label>
        <input className="c-button" type="submit" value="Create Venue" />
      </form>
    );
  }
}

NewVenue.propTypes = propTypes;

export default NewVenue;
