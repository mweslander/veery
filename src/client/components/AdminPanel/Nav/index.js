// Imports
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

// Components
import DesktopNav from './Desktop';
import MobileNav from './Mobile';

// CSS
import './index.scss';

// Services
import usersService from '../../../services/users';

// PropTypes
import basePropTypes from '../../../constants/propTypes/adminPanel/base';

const propTypes = {
  ...basePropTypes,
  isMobileScreen: PropTypes.bool
};

/*
  Nav
  <Nav/>
*/

class Nav extends Component {
  constructor() {
    super();

    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = {
      isDrawerOpen: false,
      signedIn: false
    };
  }

  handleSignOut(toggleDrawer = () => {}) {
    const router = this.props.router;

    const checkAndToggle = () => {
      if (typeof toggleDrawer === 'function') { toggleDrawer(); }
    };

    return usersService
      .signOut()
      .then(() => {
        checkAndToggle();
        return this.signOut(router);
      })
      .catch(() => {
        checkAndToggle();
        return this.signOut(router);
      });
  }

  signOut(router) {
    this.setState({ signedIn: false });
    return router.push('/admin/sign-in');
  }

  render() {
    const props = {
      handleSignOut: this.handleSignOut,
      ...this.props
    };

    if (this.props.isMobileScreen) {
      return (
        <MobileNav {...props} />
      );
    }

    return (
      <DesktopNav {...props} />
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
