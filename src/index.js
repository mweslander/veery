import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

/*
  Import Styles
*/

import './index.scss';

/*
  Import Components
*/

import App from './components/App';
import NotFound from './components/NotFound';

/*
  Routes
*/

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

/*
  Render
*/

ReactDOM.render(routes, document.querySelector('#main'));
