// Imports
import React from 'react';
import {
  hashHistory as history,
  IndexRedirect,
  IndexRoute,
  Route,
  Router
} from 'react-router';

// Components
import AdminPanel from './components/AdminPanel';
import App from './components/App';
import AdminPanelEvents from './components/AdminPanel/Events';
import AdminPanelNewEvent from './components/AdminPanel/NewEvent';
import AdminPanelNewVenue from './components/AdminPanel/NewVenue';
import AdminPanelVenues from './components/AdminPanel/Venues';
import SignIn from './components/SignIn';

// Services
import usersService from './services/users';

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

function Routes() {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={App} />
      </Route>
      <Route path="/admin" component={AdminPanel} onEnter={requireSignIn}>
        <IndexRedirect to="venues" />
        <Route path="events" component={AdminPanelEvents} />
        <Route path="new-event" component={AdminPanelNewEvent} />
        <Route path="new-venue" component={AdminPanelNewVenue} />
        <Route path="venues" component={AdminPanelVenues} />
      </Route>
      <Route path="/sign-in" component={SignIn} />
    </Router>
  );
}

export default Routes;
