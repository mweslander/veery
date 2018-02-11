// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import Button from '../../Base/Button';

// Services
import adminInvitationsService from '../../../services/admin/invitations';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  venues: PropTypes.array
};

/*
  SignUp
  <SignUp/>
*/

class SignUp extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.signUpForm.elements);
    const successMessage = `Your registration email has been sent to ${values.email}. You can finish setting up your account from there!`;

    return adminInvitationsService
      .inviteVenueAdmin(values)
      .then(() => this.props.setAlertMessage({ successMessage }))
      .catch(({ response }) => {
        let errorMessage = 'You must provide an email address.';

        if (response.data && response.data.error) {
          errorMessage = response.data.error;
        }

        return this.props.setAlertMessage({ errorMessage });
      });
  }

  render() {
    return (
      <form
        className="c-sign-up o-fieldset o-container o-container--small"
        ref={(form) => { this.signUpForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className="c-label" htmlFor="email">
          Enter your email
          <input
            className="c-field"
            name="email"
            type="text"
            placeholder="joe@thebar.com"
          />
        </label>

        <Button value="Sign Up" />
      </form>
    );
  }
}

SignUp.propTypes = propTypes;

export default SignUp;
