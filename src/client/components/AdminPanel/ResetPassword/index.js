// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '../../Base/Button';
import PasswordLabelGroup from '../../Base/PasswordLabelGroup';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
import propTypes from '../../../constants/propTypes/adminPanel/passwordForm';

/*
  ResetPassword
  <ResetPassword/>
*/

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = (form) => this.resetPasswordForm = form;
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
        let errorMessage = 'Your reset password link has expired.';

        if (response.status !== 401) {
          errorMessage = response.data.error;
        }

        return this.props.setAlertMessage({ errorMessage });
      });
  }

  render() {
    return (
      <form
        className="c-invite-venue-admin o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        <PasswordLabelGroup
          inputName="password"
          labelText="Enter your new password:"
        />

        <PasswordLabelGroup
          inputName="passwordConfirmation"
          labelText="Confirm your new password:"
        />

        <Button classes="c-reset-password__button" value="Submit" />
      </form>
    );
  }
}

ResetPassword.propTypes = propTypes;

export default ResetPassword;
