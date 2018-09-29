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
import baseVenuesPropTypes from '../../../../constants/propTypes/adminPanel/baseVenues';
import venueFormPropTypes from '../../../../constants/propTypes/adminPanel/venueForm';
const propTypes = {
  ...baseVenuesPropTypes,
  ...venueFormPropTypes,
  router: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    push: PropTypes.func.isRequired
  }),
};

/*
  Edit
  <Edit/>
*/

class Edit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = (form) => this.editForm = form;
  }

  componentWillUnmount() {
    return this.props.removeAlert();
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
