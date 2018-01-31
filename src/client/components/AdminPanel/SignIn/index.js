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
  baseClassName: PropTypes.string,
  location: PropTypes.shape({
    query: PropTypes.shape({
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

class SignIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.signInForm.elements);

    return usersService
      .signIn(values)
      .then(() => {
        this.props.setAlertMessage({ successMessage: 'Sign in successful.' });
        return this.transitionToNextPage();
      })
      .catch(() => {
        return this.props.setAlertMessage({ errorMessage: 'Your password and email do not match.' });
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
    return (
      <div className="c-sign-in o-container o-container--small">
        <form
          className="o-fieldset o-container o-container--small"
          ref={(form) => { this.signInForm = form; }}
          onSubmit={this.handleSubmit}
        >
          <label className="c-label" htmlFor="email">
            Email
            <input className="c-field" name="email" type="text" />
          </label>
          <label className="c-label" htmlFor="password">
            Password
            <input className="c-field" name="password" type="password" />
          </label>
          <Button value="Sign In" />
        </form>
      </div>
    );
  }
}

SignIn.propTypes = propTypes;

export default SignIn;
