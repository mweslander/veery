// Imports
import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';
import { startCase } from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  handleSignOut: PropTypes.func,
  isAuthRoute: PropTypes.func
};

/*
  MobileNav
  <MobileNav/>
*/

class MobileNav extends Component {
  constructor() {
    super();

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      isDrawerOpen: false
    };
  }

  buildLink(route, text) {
    return (
      <Link
        className="c-card__item c-nav__hamburger-item"
        onClick={this.toggleDrawer}
        to={`/admin/${route}`}
      >
        {text || startCase(route)}
      </Link>
    );
  }

  toggleDrawer() {
    return this.setState({
      isDrawerOpen: !this.state.isDrawerOpen
    });
  }

  render() {
    const containerClasses = classnames(
      'o-drawer o-drawer--left',
      { 'o-drawer--visible': this.state.isDrawerOpen }
    );
    const overlayClasses = classnames(
      'c-overlay c-overlay--dismissable',
      { 'c-overlay--visible': this.state.isDrawerOpen }
    );

    return (
      <div>
        <div
          className={overlayClasses}
          onClick={this.toggleDrawer}
        />

        <div className="c-nav">
          <div
            className="c-nav__item c-nav__item--left"
            onClick={this.toggleDrawer}
          >
            <i className="fa fa-bars" /> Menu
          </div>
        </div>

        <div className={containerClasses}>
          <div className="c-card">
            <div className="c-card__body">
              {this.props.isAuthRoute() ?
                <div
                  className="c-nav__hamburger-item"
                  onClick={this.toggleDrawer}
                >
                  <div className="c-button c-nav__button">
                    Sign In
                  </div>
                </div> :

                <div>
                  {this.buildLink('venues')}
                  {this.buildLink('events')}
                  {this.buildLink('invite-venue-admin', 'Invite a Venue Admin')}

                  <div
                    className="c-card__item c-nav__hamburger-item"
                    onClick={() => this.props.handleSignOut(this.toggleDrawer)}
                  >
                    <div className="c-button c-nav__button">Sign Out</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MobileNav.propTypes = propTypes;

export default MobileNav;
