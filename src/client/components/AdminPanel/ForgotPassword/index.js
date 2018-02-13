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
  ForgotPassword
  <ForgotPassword/>
*/

class ForgotPassword extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
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
        className="c-invite-venue-admin o-fieldset o-container o-container--small"
        ref={(form) => { this.forgotPasswordForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <h2>Forgot Password?</h2>

        <div className="o-grid">
          <label className="c-label o-grid__cell o-grid__cell--width-40" htmlFor="email">
            Enter your email:
          </label>

          <input
            className="c-field o-grid__cell"
            name="email"
            type="text"
            placeholder="you@thebar.com"
          />
        </div>

        <Button classes="c-forgot-password__button" value="Submit" />
      </form>
    );
  }
}

ForgotPassword.propTypes = propTypes;

export default ForgotPassword;