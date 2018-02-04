// Imports
import React from 'react';
import {
  IndexRedirect,
  Route
} from 'react-router';

// Components
import AdminPanel from '../components/AdminPanel';

import EventsDeletionModal from '../components/AdminPanel/Events/DeletionModal';
import EventsEdit from '../components/AdminPanel/Events/Edit';
import EventsNew from '../components/AdminPanel/Events/New';
import EventsShowAll from '../components/AdminPanel/Events/ShowAll';

import InviteVenueAdmin from '../components/AdminPanel/InviteVenueAdmin';
import Register from '../components/AdminPanel/Register';
import SignIn from '../components/AdminPanel/SignIn';

import VenuesDeletionModal from '../components/AdminPanel/Venues/DeletionModal';
import VenuesEdit from '../components/AdminPanel/Venues/Edit';
import VenuesNew from '../components/AdminPanel/Venues/New';
import VenuesShowAll from '../components/AdminPanel/Venues/ShowAll';

// Services
import usersService from '../services/users';

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

function AdminRoutes() {
  return (
    <Route path="/admin" component={AdminPanel}>
      <IndexRedirect to="venues" />

      <Route path="sign-in" component={SignIn} />
      <Route path="register" component={Register} />

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

      <Route path="venues" onEnter={requireSignIn}>
        <IndexRedirect to="all" />
        <Route path="all" component={VenuesShowAll}>
          <Route path=":id/delete" component={VenuesDeletionModal} />
        </Route>
        <Route path="new" component={VenuesNew} />
        <Route path=":id/edit" component={VenuesEdit} />
      </Route>
    </Route>
  );
}

export default AdminRoutes;
