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

    this.updateFocusedVenueId = this.updateFocusedVenueId.bind(this);
    this.state = {
      events: [],
      focusedVenueId: null,
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
          focusedVenueId: events[0].venue._id,
          venues
        });
      });
  }

  updateFocusedVenueId(focusedVenueId) {
    this.setState({ focusedVenueId }, () => {
      const scroller = Scroll.scroller;
      const nextEvent = this.state.events.find((event) => {
        return event.venue._id === focusedVenueId;
      });

      scroller.scrollTo(nextEvent._id, {
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
        <VenueMap
          focusedVenueId={this.state.focusedVenueId}
          updateFocusedVenueId={this.updateFocusedVenueId}
          venues={this.state.venues}
        />
        <EventList
          events={this.state.events}
          focusedVenueId={this.state.focusedVenueId}
          updateFocusedVenueId={this.updateFocusedVenueId}
        />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
