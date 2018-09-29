// Imports
import React from 'react';
import {
  IndexRedirect,
  Route
} from 'react-router';

// Components
import AdminPanel from '../../components/AdminPanel';

import EventsDeletionModal from '../../components/AdminPanel/Events/DeletionModal';
import EventsEdit from '../../components/AdminPanel/Events/Edit';
import EventsNew from '../../components/AdminPanel/Events/New';
import EventsShowAll from '../../components/AdminPanel/Events/ShowAll';

import InviteVenueAdmin from '../../components/AdminPanel/InviteVenueAdmin';
import ForgotPassword from '../../components/AdminPanel/ForgotPassword';
import Register from '../../components/AdminPanel/Register';
import ResetPassword from '../../components/AdminPanel/ResetPassword';
import SignIn from '../../components/AdminPanel/SignIn';
import SignUp from '../../components/AdminPanel/SignUp';

import adminVenueRoutes from './venues';

// Services
import usersService from '../../services/users';

function requireSignIn(nextState, replace, callback) {
  return usersService.isSignedIn()
    .then(() => {
      callback();
    })
    .catch(() => {
      const query = { ...nextState.location.query };

      if (nextState.location.pathname && nextState.location.pathname !== '/') {
        query.next = nextState.location.pathname;
      }

      replace({
        query,
        pathname: '/admin/sign-in'
      });

      callback();
    });
}

function adminRoutes() {
  return (
    <Route path="/admin" component={AdminPanel}>
      <IndexRedirect to="venues" />

      <Route path="forgot-password" component={ForgotPassword} />
      <Route path="reset-password" component={ResetPassword} />
      <Route path="register" component={Register} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />

      <Route path="events" onEnter={requireSignIn}>
        <IndexRedirect to="all" />
        <Route path="all" component={EventsShowAll}>
          <Route path=":id/delete" component={EventsDeletionModal} />
        </Route>
        <Route path="new" component={EventsNew} />
        <Route path=":id/edit" component={EventsEdit} />
      </Route>

      <Route
        path="invite-venue-admin"
        component={InviteVenueAdmin}
        onEnter={requireSignIn}
      />

      {adminVenueRoutes(requireSignIn)}
    </Route>
  );
}

export default adminRoutes;
