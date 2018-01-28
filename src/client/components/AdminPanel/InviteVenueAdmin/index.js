// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../Base/Button';

// CSS
import './index.scss';

// Services
import adminInvitationsService from '../../../services/admin/invitations';

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
  InviteVenueAdmin
  <InviteVenueAdmin/>
*/

class InviteVenueAdmin extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {
      venueIdsForSubmission: []
    };
  }

  handleCheckboxChange(event) {
    const currentVenues = this.state.venueIdsForSubmission;
    const target = event.target;

    if (target.checked) {
      currentVenues.push(target.value);
    } else {
      currentVenues.splice(currentVenues.indexOf(target.value), 1);
    }

    return this.setState({ venueIdsForSubmission: currentVenues });
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newEventForm.elements);
    values.venues = this.state.venueIdsForSubmission;

    return adminInvitationsService
      .inviteVenueAdmin(values)
      .then(() => this.props.router.push('/admin'));
  }

  render() {
    return (
      <form
        className="c-invite-venue-admin o-fieldset o-container o-container--medium"
        ref={(form) => { this.newEventForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <div className="o-grid">
          <label className="c-label o-grid__cell" htmlFor="email">
            Invite a new venue admin by email:
          </label>

          <input
            className="c-field o-grid__cell"
            name="email"
            type="text"
            placeholder="joe@thebar.com"
          />
        </div>

        <div className="c-invite-venue-admin__venues-container o-container--small o-grid" htmlFor="venue">
          <div className="c-invite-venue-admin__title o-grid__cell">Venues:</div>

          <div className="c-invite-venue-admin__venues o-grid__cell" name="venue">
            {this.props.venues.map((venue) => {
              return (
                <label
                  className="c-invite-venue-admin__label c-label o-grid__cell"
                  htmlFor={venue._id}
                  key={venue._id}
                >
                  <input
                    id={venue._id}
                    onChange={this.handleCheckboxChange}
                    type="checkbox"
                    value={venue._id}
                  />
                  <span className="c-invite-venue-admin__venue-name">{venue.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <Button value="Invite Venue Owner" />
      </form>
    );
  }
}

InviteVenueAdmin.propTypes = propTypes;

export default InviteVenueAdmin;
