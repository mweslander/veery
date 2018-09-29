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
import basePropTypes from '../../constants/propTypes/adminPanel/base';

const propTypes = {
  ...basePropTypes,
  children: PropTypes.node
};

/*
  AdminPanel
  <AdminPanel/>
*/

class AdminPanel extends Component {
  constructor() {
    super();

    this.findVenue = this.findVenue.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleSuccessfulCreation = this.handleSuccessfulCreation.bind(this);
    this.isAuthRoute = this.isAuthRoute.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
    this.updateVenues = this.updateVenues.bind(this);
    this.state = {
      events: [],
      isMobileScreen: screen.width <= 500,
      signedIn: false,
      venue: {
        events: []
      },
      venues: []
    };
  }

  componentWillMount() {
    return this.updateVenues()
      .then(this.findVenue);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.router.params.id) {
      this.findVenue();
    }
  }

  findVenue() {
    const venue = this.state.venues.find((nextVenue) => {
      return nextVenue._id === this.props.router.params.id;
    }) || { events: [] };

    return this.setState({ venue });
  }

  handleSuccessfulCreation(itemName, pathname) {
    this.setAlertMessage({ successMessage: `${itemName} successfully created.` });
    return this.props.router.push(pathname);
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
        return this.setState({ venues });
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
            handleSuccessfulCreation: this.handleSuccessfulCreation,
            isMobileScreen: this.state.isMobileScreen,
            removeAlert: this.removeAlert,
            setAlertMessage: this.setAlertMessage,
            updateEvents: this.updateEvents,
            updateVenues: this.updateVenues,
            venue: this.state.venue,
            venues: this.state.venues
          })}
      </div>
    );
  }
}

AdminPanel.propTypes = propTypes;

export default AdminPanel;
