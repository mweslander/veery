// Imports
import React, { Component } from 'react';

// Components
import Button from '../../Base/Button';
import LabelGroup from '../../Base/LabelGroup';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
import propTypes from '../../../constants/propTypes/adminPanel//passwordForm';

/*
  ForgotPassword
  <ForgotPassword/>
*/

class ForgotPassword extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = (form) => this.forgotPasswordForm = form;
  }

  componentWillMount() {
    if (this.props.router.location.query.token === 'expired') {
      return this.props.setAlertMessage({ errorMessage: 'Your reset password link has expired but don\'t worry, you can send another.' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.forgotPasswordForm.elements);

    return usersService
      .forgotPassword(values)
      .then(() => {
        this.props.setAlertMessage({ successMessage: `A reset password link has been sent to ${values.email}.` });
        return this.props.router.push('/admin/sign-in');
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          return this.props.setAlertMessage({ errorMessage: 'A user with that email cannot be found.' });
        }

        return this.props.setAlertMessage({ errorMessage: 'You must provide an email address.' });
      });
  }

  render() {
    return (
      <form
        className="c-invite-venue-admin o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        <h2>Forgot Password?</h2>

        <LabelGroup
          classes={{
            label: 'o-grid__cell--width-40'
          }}
          displayName="Enter your email:"
          name="email"
          options={{
            placeholder: 'user@bar.com',
            type: 'text'
          }}
          row
        />

        <Button classes="c-forgot-password__button" value="Submit" />
      </form>
    );
  }
}

ForgotPassword.propTypes = propTypes;

export default ForgotPassword;
