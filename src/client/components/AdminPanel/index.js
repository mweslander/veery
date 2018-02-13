// Imports
import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import 'blaze';
import classnames from 'classnames';

// Components
import Nav from './Nav';

// Services
import usersService from '../../services/users';
import adminVenuesService from '../../services/admin/venues';

// PropTypes
const propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

/*
  AdminPanel
  <AdminPanel/>
*/

class AdminPanel extends Component {
  constructor() {
    super();

    this.handleSignOut = this.handleSignOut.bind(this);
    this.isAuthRoute = this.isAuthRoute.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.updateVenues = this.updateVenues.bind(this);
    this.state = {
      isMobileScreen: screen.width <= 500,
      signedIn: false,
      venues: []
    };
  }

  componentWillMount() {
    return this.updateVenues();
  }

  setAlertMessage({ errorMessage, successMessage }) {
    return this.setState({ alertFlash: { errorMessage, successMessage } });
  }

  removeAlert() {
    return this.setState({ alertFlash: null });
  }

  updateVenues() {
    return adminVenuesService.showAll()
      .then((venues) => {
        this.setState({ venues });
      });
  }

  isAuthRoute() {
    const pathname = this.props.location.pathname;
    // TODO: change to an is-signed-in check
    const authRoutes = ['register', 'sign-in', 'sign-up'];

    return authRoutes.find(route => pathname.includes(route));
  }

  handleSignOut() {
    const router = this.props.router;

    return usersService
      .signOut()
      .then(() => {
        this.setState({ signedIn: false });
        router.push('/admin/sign-in');
      })
      .catch(() => {
        this.setState({ signedIn: false });
        router.push('/admin/sign-in');
      });
  }

  render() {
    const alertFlash = this.state.alertFlash;

    return (
      <div>
        <Nav
          {...this.props}
          isMobileScreen={this.state.isMobileScreen}
          isAuthRoute={this.isAuthRoute}
        />

        {alertFlash &&
          <div
            className={
              classnames('c-alert', {
                'c-alert--error': alertFlash.errorMessage,
                'c-alert--success': alertFlash.successMessage
              })
            }
          >{alertFlash.errorMessage || alertFlash.successMessage}</div>
        }

        {this.props.children &&
          cloneElement(this.props.children, {
            isMobileScreen: this.state.isMobileScreen,
            removeAlert: this.removeAlert,
            setAlertMessage: this.setAlertMessage,
            updateVenues: this.updateVenues,
            venues: this.state.venues
          })}
      </div>
    );
  }
}

AdminPanel.propTypes = propTypes;

export default AdminPanel;
