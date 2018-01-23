// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Services
import eventsService from '../../../services/events';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  venues: PropTypes.array
};

/*
  NewVenueOwner
  <NewVenueOwner/>
*/

class NewVenueOwner extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newVenueOwnerForm.elements);

    return eventsService
      .createEvent(values)
      .then(() => this.props.router.push('/admin/events'));
  }

  render() {
    return (
      <form
        className="new-venue-owner o-fieldset o-container o-container--small"
        ref={(form) => { this.newVenueOwnerForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className="c-label" htmlFor="title">
          Email
          <input className="c-field" name="title" type="text" placeholder="jason@jasonsbarandgrill.com" />
        </label>
        <input className="c-button" type="submit" value="Invite Venue Owner" />
      </form>
    );
  }
}

NewVenueOwner.propTypes = propTypes;

export default NewVenueOwner;
