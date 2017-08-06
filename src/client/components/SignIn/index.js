// Imports
import React, {
  Component,
  PropTypes
} from 'react';

// CSS
import './index.scss';

// Services
import usersService from '../../services/users';

// Utils
import mapFormValues from '../../utils/mapFormValues';

const propTypes = {
  baseClassName: PropTypes.string,
  location: PropTypes.shape({
    query: PropTypes.shape({
      next: PropTypes.string
    }).isRequired
  }).isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  })
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
      .then(() => this.transitionToNextPage());
  }

  transitionToNextPage() {
    const query = { ...this.props.location.query };

    if (query.next) {
      delete query.next;
    }

    this.props.router.replace({
      query,
      pathname: '/admin'
    });
  }

  render() {
    return (
      <form
        className="sign-in o-fieldset o-container o-container--small"
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
        <input className="c-button" type="submit" value="Sign In" />
      </form>
    );
  }
}

SignIn.propTypes = propTypes;

export default SignIn;