// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import _ from 'lodash';

// Components
import EventList from '../EventList';
import Header from '../Header';
import VenueMap from '../VenueMap';

// CSS
import './index.scss';

// Services
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
  constructor() {
    super();

    this.searchForVenues = this.searchForVenues.bind(this);
    this.updateFocusedVenue = this.updateFocusedVenue.bind(this);
    this.state = {
      events: [],
      focusedVenue: null,
      venues: []
    };
  }

  applyNewStateFromVenues(newState, venues) {
    const focusedVenue = this.state.focusedVenue;
    const ids = venues.map(v => v._id.toString());
    const currentId = focusedVenue && focusedVenue._id.toString();

    if (ids.indexOf(currentId) > -1) {
      newState.focusedVenue = focusedVenue;
    }

    return this.setState(newState);
  }

  searchForVenues(params = {}) {
    return venuesService
      .showAll(params)
      .then((venues) => {
        const eventsFromVenues = venues.map(venue => venue.events);
        const formattedEvents = _.sortBy(_.flatten(eventsFromVenues), ['startDate', 'startTime']);
        const formattedVenues = venues.filter(venue => venue.events.length > 0);

        const defaultNewState = {
          events: formattedEvents,
          focusedVenue: formattedEvents[0] && formattedEvents[0].venue,
          venues: formattedVenues
        };

        return this.applyNewStateFromVenues(defaultNewState, venues);
      });
  }

  updateFocusedVenue(focusedVenue, focusedEvent = {}) {
    return this.setState({ focusedVenue }, () => {
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

  render() {
    return (
      <div className="l-app">
        <Header />
        <div className="c-interactive-container">
          <VenueMap
            focusedVenue={this.state.focusedVenue}
            searchForVenues={this.searchForVenues}
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
