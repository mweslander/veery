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
  Edit
  <Edit/>
*/

class Edit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  componentWillUnmount() {
    return this.props.removeAlert();
  }

  setForm(form) {
    this.editForm = form;
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.editForm.elements);
    const route = `/admin/venues/${this.props.router.params.id}`;

    return adminVenuesService
      .updateVenue(values, route)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Venue successfully updated.' });
        return this.props.router.push(`${route}/edit`);
      });
  }

  render() {
    const { venue } = this.props;

    return (
      <form
        className="c-edit-venue o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        {venue._id &&
          <VenueForm venue={venue} />}

        <Button value="Update Venue" />
      </form>
    );
  }
}

Edit.propTypes = propTypes;

export default Edit;
