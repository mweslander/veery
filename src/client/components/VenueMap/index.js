// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

// CSS
import './index.scss';

// Images
import spinner from '../../img/spinner.svg';

// Services
import googleMapsService from '../../services/googleMaps';

/*
  VenueMap
  <VenueMap/>
*/

const propTypes = {
  focusedVenue: PropTypes.object,
  isLoading: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  searchForVenues: PropTypes.func,
  updateFocusedVenue: PropTypes.func,
  venues: PropTypes.array
};

class VenueMap extends Component {
  constructor() {
    super();
    // Durham, NC
    const mapCenter = new google.maps.LatLng(35.992729, -78.903970); // eslint-disable-line no-undef

    this.addBoundsChangedListener = this.addBoundsChangedListener.bind(this);
    this.searchThisArea = this.searchThisArea.bind(this);
    this.state = {
      map: null,
      mapProps: {
        center: mapCenter,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP // eslint-disable-line no-undef
      },
      searchThisAreaisDisplaying: false
    };
  }

  componentDidMount() {
    return navigator.geolocation.getCurrentPosition(
      (position) => {
        return this.updateMapPropsWithNewCoordinates(position.coords, this.addBoundsChangedListener);
      },
      this.addBoundsChangedListener,
      {
        enableHighAccuracy: true,
        timeout: 9000
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const receivedNewVenues = !isEqual(
      this.props.venues.sort(),
      nextProps.venues.sort()
    );
    const receivedNewFocusedVenue = !isEqual(
      this.props.focusedVenue,
      nextProps.focusedVenue
    );
    const generateMap = () => {
      return this.generateMap(nextProps.venues, nextProps.focusedVenue);
    };

    if (receivedNewVenues) { return generateMap(); }

    if (receivedNewFocusedVenue) {
      const { latitude, longitude } = nextProps.focusedVenue;

      return this.updateMapPropsWithNewCoordinates(
        { latitude, longitude },
        generateMap
      );
    }
  }

  setMarkers(map, venues, focusedVenue) {
    return venues
      .forEach((venue) => {
        const marker = googleMapsService.buildMarker(map, null, venue, focusedVenue);
        this.addMarkerListener(marker, venue);
      });
  }

  addBoundsChangedListener() {
    return this.generateMap([], {}, (map) => {
      const callback = () => {
        const params = googleMapsService.getBounds(map);
        return this.props.searchForVenues(params);
      };

      return google.maps // eslint-disable-line no-undef
        .event
        .addListenerOnce(map, 'bounds_changed', callback);
    });
  }

  updateMapPropsWithNewCoordinates(newMapProps, callback) {
    const { latitude, longitude } = newMapProps;
    const mapCenter = new google.maps.LatLng(latitude, longitude); // eslint-disable-line no-undef
    const mapProps = {
      ...this.state.mapProps,
      ...newMapProps,
      center: mapCenter
    };

    return this.setState({ mapProps }, callback);
  }

  addMarkerListener(marker, venue) {
    return marker.addListener('click', () => {
      return this.updateMapPropsWithNewCoordinates(venue, () => {
        return this.props.updateFocusedVenue(venue);
      });
    });
  }

  searchThisArea() {
    const map = this.state.map;
    const latitude = map.center.lat();
    const longitude = map.center.lng();
    const zoom = map.zoom;

    const newMapProps = {
      latitude,
      longitude,
      zoom
    };

    return this.updateMapPropsWithNewCoordinates(newMapProps, () => {
      this.toggleSearchThisAreaButton();

      const params = googleMapsService.getBounds(map);
      return this.props.searchForVenues(params);
    });
  }

  toggleSearchThisAreaButton(bool = !this.state.searchThisAreaisDisplaying) {
    return this.setState({ searchThisAreaisDisplaying: bool });
  }

  generateMap(venues = [], focusedVenue = {}, callback = () => {}) {
    const map = googleMapsService.buildBaseMap(this.state.mapProps);

    this.setMarkers(map, venues, focusedVenue);
    map.addListener('zoom_changed', () => this.toggleSearchThisAreaButton(true));
    map.addListener('dragend', () => this.toggleSearchThisAreaButton(true));

    return this.setState({ map }, () => callback(map));
  }

  render() {
    const mobileClasses = classnames(
      'c-map__container',
      { 'c-map__container--with-venues': this.props.venues.length > 0 }
    );
    const searchThisAreaClasses = classnames(
      'c-map__search-this-area',
      { 'c-map__search-this-area--displaying': this.state.searchThisAreaisDisplaying }
    );

    if (this.props.isMobileScreen) {
      return (
        <div className={mobileClasses}>
          <div className="c-map" id="googleMap" />

          {this.state.searchThisAreaisDisplaying &&
            <div
              onClick={this.searchThisArea}
              className="c-map__search-this-area"
            >
              search this area
            </div>}
        </div>
      );
    }

    return (
      <div className="c-map__container">
        {this.props.isLoading &&
          <div className="c-map__overlay">
            <img className="c-map__spinner" src={spinner} />
          </div>}

        <div className="c-map" id="googleMap" />

        <div
          onClick={this.searchThisArea}
          className={searchThisAreaClasses}
        >
          search this area
        </div>
      </div>
    );
  }
}

VenueMap.propTypes = propTypes;

export default VenueMap;
