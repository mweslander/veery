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

ReactGA.initialize('UA-114144285-1', { debug: true });

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
