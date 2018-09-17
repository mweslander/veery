// Imports
import React from 'react';
import {
  hashHistory as history,
  IndexRoute,
  Route,
  Router
} from 'react-router';
import ReactGA from 'react-ga';

// Components
import App from '../components/App';

// Routes
import adminRoutes from './admin';

// Config
import config from '../../api/config';

console.log('staging:', config);
ReactGA.initialize(config.googleAnalytics.propertyId, { debug: false });

function Routes() {
  const sendPageview = () => {
    return ReactGA.pageview(window.location.hash + window.location.search);
  };

  return (
    <Router onUpdate={sendPageview} history={history}>
      <Route path="/">
        <IndexRoute component={App} />
      </Route>

      {adminRoutes()}
    </Router>
  );
}

export default Routes;
