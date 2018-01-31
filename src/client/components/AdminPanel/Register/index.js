// Imports
import React, {
  Component,
  PropTypes
} from 'react';

// Components
import Button from '../../Base/Button';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// Utils
import mapFormValues from '../../../utils/mapFormValues';

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
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.registerForm.elements);
    values.invitationId = this.props.location.query.invitationId;

    return usersService
      .register(values)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Registration successful.' });
        return this.transitionToNextPage();
      })
      .catch(() => {
        return this.props.setAlertMessage({ errorMessage: 'You must enter a password.' });
      });
  }

  transitionToNextPage() {
    const query = { ...this.props.location.query };

    if (query.next) {
      delete query.next;
    }

    this.props.router.replace({
      query,
      pathname: '/admin/venues'
    });
  }

  render() {
    const email = this.props.location.query.email;

    return (
      <div className="c-register o-container o-container--small">
        <form
          className="o-fieldset o-container o-container--small"
          ref={(form) => { this.registerForm = form; }}
          onSubmit={this.handleSubmit}
        >
          <label className="c-label" htmlFor="email">
            Email: {email}
          </label>
          <label className="c-label" htmlFor="password">
            Password
            <input className="c-field" name="password" type="password" />
          </label>
          <Button value="Register" />
        </form>
      </div>
    );
  }
}

Register.propTypes = propTypes;

export default Register;
