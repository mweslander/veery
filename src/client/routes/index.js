// Imports
import React from 'react';
import {
  hashHistory as history,
  IndexRoute,
  Route,
  Router
} from 'react-router';

// Components
import App from '../components/App';
import Register from '../components/Register';
import SignIn from '../components/SignIn';

// Routes
import adminRoutes from './admin';

function Routes() {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={App} />
      </Route>

      {adminRoutes()}

      <Route path="sign-in" component={SignIn} />
      <Route path="register" component={Register} />
    </Router>
  );
}

export default Routes;
