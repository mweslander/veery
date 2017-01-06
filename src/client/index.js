import React from 'react';
import { render } from 'react-dom';

// Styles
import './index.scss';

// Components
import App from './components/App';

// Initial State
import { venues } from './data/venues';

// Render
render(<App venues={venues} />, document.querySelector('#main'));
