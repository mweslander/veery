// Imports
import React, {
  cloneElement,
  Component
} from 'react';
import {
  Link
} from 'react-router';
import PropTypes from 'prop-types';
import 'blaze';

// Services
import usersService from '../../services/users';
import venuesService from '../../services/venues';

// PropTypes
const propTypes = {
  children: PropTypes.node,
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
    this.state = {
      venues: []
    };
  }

  componentWillMount() {
    return venuesService.getAll()
      .then((venues) => {
        this.setState({ venues });
      });
  }

  handleSignOut() {
    const router = this.props.router;

    return usersService
      .signOut()
      .then(() => {
        router.push('/sign-in');
      })
      .catch(() => {
        router.push('/sign-in');
      });
  }

  render() {
    return (
      <div>
        <div className="c-nav c-nav--inline">
          <Link className="c-nav__item" to="/admin/venues">All Venues</Link>
          <Link className="c-nav__item" to="/admin/events">All Events</Link>
          <Link className="c-nav__item" to="/admin/new-venue">Add a New Venue</Link>
          <Link className="c-nav__item" to="/admin/new-event">Add a New Event</Link>
          <a className="c-nav__item c-nav__item--right" onClick={this.handleSignOut}>Sign Out</a>
        </div>
        {this.props.children &&
          cloneElement(this.props.children, {
            venues: this.state.venues
          })}
      </div>
    );
  }
}

AdminPanel.propTypes = propTypes;

export default AdminPanel;
