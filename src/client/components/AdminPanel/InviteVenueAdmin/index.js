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
import propTypes from '../../../constants/propTypes/adminPanel/baseVenues';

/*
  InviteVenueAdmin
  <InviteVenueAdmin/>
*/

class InviteVenueAdmin extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.setForm = (form) => this.inviteVenueAdminForm = form;
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
    const values = mapFormValues(this.inviteVenueAdminForm.elements);
    values.venues = this.state.venueIdsForSubmission;

    return adminInvitationsService
      .inviteVenueAdmin(values)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Invitation successfully sent.' });
        return this.props.router.push('/admin');
      })
      .catch(() => {
        return this.props.setAlertMessage({ errorMessage: 'You must provide an email address.' });
      });
  }

  render() {
    return (
      <form
        className="c-invite-venue-admin o-container o-container--medium"
        ref={this.setForm}
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
