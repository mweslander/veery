// Imports
import React, { Component } from 'react';

// Components
import Header from '../Header';
import Map from '../Map';
import VenueList from '../VenueList';

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
