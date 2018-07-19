// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../Base/Button';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    location: PropTypes.shape({
      query: PropTypes.shape({
        token: PropTypes.string
      })
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

/*
  ResetPassword
  <ResetPassword/>
*/

class ResetPassword extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.resetPasswordForm.elements);

    return usersService
      .resetPassword(values, this.props.router.location.query.token)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Your new password has been set.' });
        return this.props.router.push('/admin/venues');
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          return this.props.setAlertMessage({ errorMessage: 'Your reset password link has expired.' });
        }

        return this.props.setAlertMessage({ errorMessage: response.data.error });
      });
  }

  render() {
    return (
      <form
        className="c-invite-venue-admin o-container o-container--small"
        ref={(form) => { this.resetPasswordForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <label className="c-label" htmlFor="password">
          Enter your new password:
          <input
            className="c-field o-grid__cell"
            name="password"
            type="password"
            placeholder="password"
          />
        </label>

        <label className="c-label" htmlFor="password">
          Confirm your new password:
          <input
            className="c-field o-grid__cell"
            name="passwordConfirmation"
            type="password"
            placeholder="password"
          />
        </label>

        <Button classes="c-reset-password__button" value="Submit" />
      </form>
    );
  }
}

ResetPassword.propTypes = propTypes;

export default ResetPassword;
