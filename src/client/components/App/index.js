// Imports
import React, { Component, PropTypes } from 'react';

// Components
import EventList from '../EventList';
import Header from '../Header';
import VenueMap from '../VenueMap';

// CSS
import './index.scss';

// Services
import eventsService from '../../services/events';
import venuesService from '../../services/venues';

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
      events: [],
      venues: []
    };
  }

  componentWillMount() {
    const promises = [
      eventsService.getAll(),
      venuesService.getAll()
    ];

    return Promise.all(promises)
      .then(([events, venues]) => {
        this.setState({ events });
        this.setState({ venues });
      });
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
        <EventList events={this.state.events} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
