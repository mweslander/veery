// Imports
import React, { Component } from 'react';

// Components
import Header from '../Header';
import Map from '../Map';
import VenueList from '../VenueList';

// Images
import mapImg from './map.png';

// CSS
import './index.scss';

/*
  App
  <App/>
*/

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Map />
        <VenueList />
      </div>
    );
  }
}

export default App;
