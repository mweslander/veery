// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const mapCenter = new google.maps.LatLng(30.263956, -97.739537); // eslint-disable-line no-undef

    this.establishMapListenerCallback = this.establishMapListenerCallback.bind(this);
    this.state = {
      mapProps: {
        center: mapCenter,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP // eslint-disable-line no-undef
      }
    };
  }

  componentDidMount() {
    const map = this.generateMap();

    const callback = () => {
      const params = googleMapsService.getBounds(map);
      return this.props.searchForVenues(params);
    };

    return google.maps // eslint-disable-line no-undef
      .event
      .addListenerOnce(map, 'bounds_changed', callback);
  }

  componentWillReceiveProps(nextProps) {
    const receivedNewVenues = !_.isEqual(
      this.props.venues.sort(),
      nextProps.venues.sort()
    );
    const receivedNewFocusedVenue = !_.isEqual(
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

  setMarkers(map, venues = [], focusedVenue = {}) {
    return venues
      .forEach((venue) => {
        const marker = googleMapsService.buildMarker(map, null, venue, focusedVenue);
        this.addMarkerListener(marker, venue);
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
      const { latitude, longitude } = venue;
      return this.updateMapPropsWithNewCoordinates({ latitude, longitude }, () => {
        return this.props.updateFocusedVenue(venue);
      });
    });
  }

  establishMapListenerCallback(map) {
    const latitude = map.center.lat();
    const longitude = map.center.lng();
    const zoom = map.zoom;

    const newMapProps = {
      latitude,
      longitude,
      zoom
    };

    return this.updateMapPropsWithNewCoordinates(newMapProps, () => {
      const params = googleMapsService.getBounds(map);
      return this.props.searchForVenues(params);
    });
  }

  generateMap(venues, focusedVenue) {
    const map = googleMapsService.buildBaseMap(this.state.mapProps);

    this.setMarkers(map, venues, focusedVenue);
    map.addListener('zoom_changed', () => this.establishMapListenerCallback(map));
    map.addListener('dragend', () => this.establishMapListenerCallback(map));

    return map;
  }

  render() {
    if (this.props.isMobileScreen) {
      return <div className="c-map" id="googleMap" />;
    }

    return (
      <div className="c-map__container">
        {this.props.isLoading &&
          <div className="c-map__overlay">
            <img className="c-map__spinner" src={spinner} />
          </div>}

        <div className="c-map" id="googleMap" />
      </div>
    );
  }
}

VenueMap.propTypes = propTypes;

export default VenueMap;
