// Imports
import React, { Component, PropTypes } from 'react';

// Components
import Header from '../Header';
import Map from '../Map';
import VenueList from '../VenueList';

// CSS
import './index.scss';

// PropTypes
const propTypes = {
  venues: PropTypes.array
};

/*
  App
  <App/>
*/

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredVenues: this.eventsToday(props.venues)
    };
  }

  eventsToday(venues) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const n = d.getDay();
    return venues.filter((venue) => {
      return venue.eventDay === weekdays[n];
    });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Map venues={this.state.filteredVenues} />
        <VenueList venues={this.state.filteredVenues} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
