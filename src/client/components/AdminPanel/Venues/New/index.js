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
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
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
      .then(() => this.props.router.push('/admin'));
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
