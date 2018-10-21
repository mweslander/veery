// Imports
import React, { Component } from 'react';

// Components
import VenueForm from '../../../Base/VenueForm';
import Button from '../../../Base/Button';

// CSS
import './index.scss';

// Services
import adminVenuesService from '../../../../services/admin/venues';

// Utils
import mapFormValues from '../../../../utils/mapFormValues';

// PropTypes
import propTypes from '../../../../constants/propTypes/adminPanel/venueForm';

/*
  New
  <New/>
*/

class NewVenue extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  setForm(form) {
    this.newVenueForm = form;
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newVenueForm.elements);

    return adminVenuesService
      .createVenue(values)
      .then(() => {
        return this.props.handleSuccessfulCreation('Venue', '/admin');
      });
  }

  render() {
    return (
      <form
        className="c-new-venue o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        <VenueForm
          venue={{}}
        />

        <Button value="Create Venue" />
      </form>
    );
  }
}

NewVenue.propTypes = propTypes;

export default NewVenue;
