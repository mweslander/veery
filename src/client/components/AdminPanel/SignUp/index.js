// Imports
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import Button from '../../Base/Button';
import HomeLink from '../HomeLink';
import LabelGroup from '../../Base/LabelGroup';

// Services
import adminInvitationsService from '../../../services/admin/invitations';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

// PropTypes
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

/*
  SignUp
  <SignUp/>
*/

class SignUp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = (form) => this.signUpForm = form;
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.signUpForm.elements);
    const successMessage = `Your registration email has been sent to ${values.email}. You can finish setting up your account from there!`;

    return adminInvitationsService
      .inviteVenueAdmin(values)
      .then(() => {
        ReactGA.event({
          category: 'Sign Up',
          action: 'Registration Email Successfully Sent'
        });

        return this.props.setAlertMessage({ successMessage });
      })
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
        className="c-sign-up o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        <HomeLink />

        <LabelGroup
          displayName="Enter your email:"
          name="email"
          options={{
            placeholder: 'user@bar.com',
            type: 'text'
          }}
        />

        <Button value="Sign Up" />
      </form>
    );
  }
}

SignUp.propTypes = propTypes;

export default SignUp;
