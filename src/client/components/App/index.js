// Imports
import React, { Component, PropTypes } from 'react';

// Components
import Header from '../Header';
import VenueMap from '../VenueMap';
import VenueList from '../VenueList';

// CSS
import './index.scss';

// Services
import venueService from '../../services/venues';

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
      venues: []
    };
  }

  componentWillMount() {
    return venueService.getAll()
      .then((venues) => this.setState({ venues }));
  }

  eventsToday(venues) {
    return venues;
    // const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const d = new Date();
    // const n = d.getDay();
    // return venues.filter((venue) => {
    //   return venue.eventDay === weekdays[n];
    // });
  }

  render() {
    return (
      <div className="app">
        <Header />
        <VenueMap venues={this.state.venues} />
        <VenueList venues={this.state.venues} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
