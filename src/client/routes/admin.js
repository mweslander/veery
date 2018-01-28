// Imports
import React from 'react';
import {
  IndexRedirect,
  Route
} from 'react-router';

// Components
import AdminPanel from '../components/AdminPanel';
import AdminPanelEventsEdit from '../components/AdminPanel/Events/Edit';
import AdminPanelEventsNew from '../components/AdminPanel/Events/New';
import AdminPanelEventsShowAll from '../components/AdminPanel/Events/ShowAll';
import AdminPanelInviteVenueAdmin from '../components/AdminPanel/InviteVenueAdmin';
import AdminPanelVenuesEdit from '../components/AdminPanel/Venues/Edit';
import AdminPanelVenuesNew from '../components/AdminPanel/Venues/New';
import AdminPanelVenuesShowAll from '../components/AdminPanel/Venues/ShowAll';

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
        pathname: '/sign-in'
      });

      callback();
    });
}

function AdminRoutes() {
  return (
    <Route path="/admin" component={AdminPanel} onEnter={requireSignIn}>
      <IndexRedirect to="venues" />

      <Route path="events">
        <IndexRedirect to="all" />
        <Route path="all" component={AdminPanelEventsShowAll} />
        <Route path="new" component={AdminPanelEventsNew} />
        <Route path=":id/edit" component={AdminPanelEventsEdit} />
      </Route>

      <Route path="invite-venue-admin" component={AdminPanelInviteVenueAdmin} />

      <Route path="venues">
        <IndexRedirect to="all" />
        <Route path="all" component={AdminPanelVenuesShowAll} />
        <Route path="new" component={AdminPanelVenuesNew} />
        <Route path=":id/edit" component={AdminPanelVenuesEdit} />
      </Route>

    </Route>
  );
}

export default AdminRoutes;
