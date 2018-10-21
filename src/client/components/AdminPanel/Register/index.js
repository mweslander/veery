// Imports
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

// Components
import Button from '../../Base/Button';
import LabelGroup from '../../Base/LabelGroup';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// Utils
import mapFormValues from '../../../utils/mapFormValues';
import transitionToNextPage from '../../../utils/transitionToNextPage';

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      email: PropTypes.string,
      invitationId: PropTypes.string,
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setForm = this.setForm.bind(this);
  }

  setForm(form) {
    this.registerForm = form;
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.registerForm.elements);
    values.invitationId = this.props.location.query.invitationId;

    return usersService
      .register(values)
      .then(() => {
        ReactGA.event({
          category: 'Sign Up',
          action: 'Registration Successfully Finished'
        });

        this.props.setAlertMessage({ successMessage: 'Registration successful.' });
        return transitionToNextPage(this.props, '/admin/venues');
      })
      .catch(({ response }) => {
        return this.props.setAlertMessage({ errorMessage: response.data.error });
      });
  }

  render() {
    const email = this.props.location.query.email;

    return (
      <div className="c-register o-container o-container--small">
        <form
          className="o-container o-container--small"
          ref={this.setForm}
          onSubmit={this.handleSubmit}
        >
          <label className="c-label" htmlFor="email">
            Email: {email}
          </label>

          <LabelGroup
            name="password"
            options={{
              placeholder: 'password',
              type: 'password'
            }}
          />

          <LabelGroup
            displayName="Confirm your password"
            name="passwordConfirmation"
            options={{
              placeholder: 'password',
              type: 'password'
            }}
          />

          <Button value="Register" />
        </form>
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default Register;
