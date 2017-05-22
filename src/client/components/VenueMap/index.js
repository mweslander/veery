// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import { firstAttempt } from '../../data/mapStyles';
import './index.scss';

// Images
import you from '../../img/you.svg';

// Colors
const blue = '#0066CC';
const orange = '#FF9900';
const orangeBright = '#b36b00';
const orangeBurnt = '#b36b00';
const white = '#CDE1F7';

/*
  VenueMap
  <VenueMap/>
*/

const propTypes = {
  focusedVenueId: PropTypes.string,
  updateFocusedVenueId: PropTypes.func,
  venues: PropTypes.array
};

class VenueMap extends Component {
  constructor(props) {
    super(props);
    const mapCenter = new google.maps.LatLng(35.992729, -78.903970); // eslint-disable-line no-undef

    this.state = {
      map: null,
      mapProps: {
        center: mapCenter,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP // eslint-disable-line no-undef
      },
      venues: this.props.venues
    };
  }

  componentWillReceiveProps({ venues }) {
    this.setState({ venues }, () => {
      this.generateMap(venues);
    });
  }

  setMarkers(map) {
    const geocoder = new google.maps.Geocoder(); // eslint-disable-line no-undef

    const promises = this.state.venues.map((venue) => {
      return this.geocodeAddress(geocoder, venue);
    });

    return Promise.all(promises)
      .then((positions) => {
        positions.forEach((position, iteration) => {
          const venueId = this.state.venues[iteration]._id;
          const icon = this.buildMarkerIcon(venueId);
          const marker = this.buildMarker(icon, map, position);

          marker.addListener('click', () => {
            this.props.updateFocusedVenueId(venueId);
          });
        });

        return this.setState({ map });
      });
  }

  generateMap() {
    const map = new google.maps.Map(document.getElementById('googleMap'), this.state.mapProps); // eslint-disable-line no-undef
    const fifteenMile = this.createCircle(15000, blue);
    const tenMile = this.createCircle(10000, white);
    const fiveMile = this.createCircle(5000, orange);
    const marker = this.buildMarker(you, map, this.state.mapProps.center);

    map.set('styles', firstAttempt);
    fifteenMile.setMap(map);
    tenMile.setMap(map);
    fiveMile.setMap(map);
    marker.setMap(map);

    return this.setMarkers(map);
  }

  geocodeAddress(geocoder, venue) {
    const address = `${venue.address}, ${venue.city}, ${venue.zipCode}`;

    return new Promise((resolve, reject) => {
      return geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0].geometry.location, venue._id);
        } else {
          reject(status);
        }
      });
    });
  }

  buildMarkerIcon(venueId) {
    const path = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
    const { fillColor, fillOpacity, scale } = this.props.focusedVenueId === venueId ?
    {
      fillColor: orangeBright,
      fillOpacity: 1,
      scale: 0.6
    } :
    {
      fillColor: orangeBurnt,
      fillOpacity: 0.3,
      scale: 0.4
    };

    return {
      path,
      fillColor,
      fillOpacity,
      scale,
      strokeColor: white,
      strokeWeight: 4
    };
  }

  buildMarker(icon, map, position) {
    return new google.maps.Marker({ // eslint-disable-line no-undef
      icon,
      map,
      position
    });
  }

  createCircle(radius, color) {
    return new google.maps.Circle({ // eslint-disable-line no-undef
      center: this.state.mapProps.center,
      radius,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.1
    });
  }

  render() {
    return <div className="map" id="googleMap" />;
  }
}

VenueMap.propTypes = propTypes;

export default VenueMap;
