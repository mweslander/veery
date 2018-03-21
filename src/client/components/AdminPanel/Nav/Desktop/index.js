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

// Images
import logo from '../../../../img/veery-logo--white.png';

/*
  NavDesktop
  <NavDesktop/>
*/

function NavDesktop({ isAuthRoute, handleSignOut }) {
  return (
    <div className="c-nav c-nav--inline">
      {isAuthRoute() ?
        <div className="c-nav--desktop">
          <div className="c-nav__item" />
          <Link className="c-nav__item c-nav__item--right" to="/admin/sign-in">Sign In</Link>
        </div> :

        <div className="c-nav--desktop">
          <Link className="c-nav__logo-container c-nav__item c-nav__item--left o-grid" to="/admin/venues">
            <img className="c-nav__img o-grid__cell" src={logo} alt="Veery logo" />
            <h3 className="c-heading c-nav__heading o-grid__cell">VEERY</h3>
          </Link>
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
