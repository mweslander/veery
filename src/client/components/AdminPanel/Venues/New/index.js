// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
const propTypes = {
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

/*
  New
  <New/>
*/

class NewVenue extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newVenueForm.elements);

    return adminVenuesService
      .createVenue(values)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Venue successfully created.' });
        return this.props.router.push('/admin');
      });
  }

  render() {
    return (
      <form
        className="new-venue o-fieldset o-container o-container--small"
        ref={(form) => { this.newVenueForm = form; }}
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
