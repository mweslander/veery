// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

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

    this.updateFocusedVenue = this.updateFocusedVenue.bind(this);
    this.state = {
      events: [],
      focusedVenue: null,
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
        this.setState({
          events,
          focusedVenue: events[0].venue,
          venues
        });
      });
  }

  updateFocusedVenue(focusedVenue, focusedEvent = {}) {
    this.setState({ focusedVenue }, () => {
      const scroller = Scroll.scroller;
      const nextEvent = this.state.events.find((event) => {
        return event.venue._id === focusedVenue._id;
      });

      scroller.scrollTo(focusedEvent._id || nextEvent._id, {
        duration: 500,
        smooth: true,
        containerId: 'containerElement'
      });
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
        <div className="interactive-container">
          <VenueMap
            focusedVenue={this.state.focusedVenue}
            updateFocusedVenue={this.updateFocusedVenue}
            venues={this.state.venues}
          />
          <EventList
            events={this.state.events}
            focusedVenue={this.state.focusedVenue}
            updateFocusedVenue={this.updateFocusedVenue}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
