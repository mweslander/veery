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
  setAlertMessage: PropTypes.func,
  venues: PropTypes.array
};

/*
  Edit
  <Edit/>
*/

class Edit extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { venue: {} };
  }

  componentWillReceiveProps(nextProps) {
    const venue = nextProps.venues.find((nextVenue) => {
      return nextVenue._id === this.props.router.params.id;
    });

    return this.setState({ venue });
  }

  componentWillUnmount() {
    return this.props.removeAlert();
  }

  handleChange({ target }) {
    const venue = this.state.venue;
    venue[target.name] = target.value;

    return this.setState({ venue });
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.editForm.elements);
    const route = `/admin/venues/${this.state.venue._id}`;

    return adminVenuesService
      .updateVenue(values, route)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Venue successfully updated.' });
        return this.props.router.push(`${route}/edit`);
      });
  }

  render() {
    const { venue } = this.state;

    return (
      <form
        className="new-event o-fieldset o-container o-container--small"
        ref={(form) => { this.editForm = form; }}
        onSubmit={this.handleSubmit}
      >
        {venue._id &&
          <VenueForm
            handleChange={this.handleChange}
            venue={venue}
          />}

        <Button value="Update Venue" />
      </form>
    );
  }
}

Edit.propTypes = propTypes;

export default Edit;
