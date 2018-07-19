// Imports
import React, {
  cloneElement,
  Component
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Nav from './Nav';

// Services
import adminEventsService from '../../services/admin/events';
import adminVenuesService from '../../services/admin/venues';
import usersService from '../../services/users';

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
    this.updateEvents = this.updateEvents.bind(this);
    this.updateVenues = this.updateVenues.bind(this);
    this.state = {
      events: [],
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

  updateEvents() {
    return adminEventsService.showAll()
      .then((events) => {
        this.setState({ events });
      });
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
    const authRoutes = ['forgot-password', 'reset-password', 'register', 'sign-in', 'sign-up'];

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
            role="alert"
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
            events: this.state.events,
            isMobileScreen: this.state.isMobileScreen,
            removeAlert: this.removeAlert,
            setAlertMessage: this.setAlertMessage,
            updateEvents: this.updateEvents,
            updateVenues: this.updateVenues,
            venues: this.state.venues
          })}
      </div>
    );
  }
}

AdminPanel.propTypes = propTypes;

export default AdminPanel;
