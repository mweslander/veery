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
  }),
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
    const venue = nextProps.venues.find((venue) => {
      return venue._id === this.props.router.params.id;
    });

    return this.setState({ venue });
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
      .then(() => this.props.router.push(`${route}/edit`));
  }

  render() {
    const frequencies = ['one time', 'weekly', 'first of the month'];
    const { venue } = this.state;

    // TODO: decide if there is a scenario where this.state.venue._id wouldn't pop up (besides changing the url)
    return (
      <form
        className="new-event o-fieldset o-container o-container--small"
        ref={(form) => { this.editForm = form; }}
        onSubmit={this.handleSubmit}
      >
        {this.state.venue._id &&
          <VenueForm
            handleChange={this.handleChange}
            venue={venue}
          />
        }

        <Button value="Update Venue" />
      </form>
    );
  }
}

Edit.propTypes = propTypes;

export default Edit;
