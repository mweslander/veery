// Imports
import React from 'react';
import {
  Link
} from 'react-router';
import PropTypes from 'prop-types';

// PropTypes
const propTypes = {
  handleSignOut: PropTypes.func,
  isAuthRoute: PropTypes.func
};

/*
  NavDesktop
  <NavDesktop/>
*/

function NavDesktop({ isAuthRoute, handleSignOut }) {
  return (
    <div className="c-nav c-nav--inline">
      {isAuthRoute() ?
        <div>
          <div className="c-nav__item" />
          <Link className="c-nav__item c-nav__item--right" to="/admin/sign-in">Sign In</Link>
        </div> :

        <div>
          <Link className="c-nav__item" to="/admin/venues">Venues</Link>
          <Link className="c-nav__item" to="/admin/events">Events</Link>
          <Link className="c-nav__item" to="/admin/invite-venue-admin">Invite a Venue Admin</Link>

          <a
            className="c-nav__item c-nav__item--right"
            onClick={() => handleSignOut(() => {})}
          >
            Sign Out
          </a>
        </div>
      }
    </div>
  );
}

NavDesktop.propTypes = propTypes;

export default NavDesktop;
