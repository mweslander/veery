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

// Routes
import adminRoutes from './admin';

function Routes() {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={App} />
      </Route>

      {adminRoutes()}
    </Router>
  );
}

export default Routes;
