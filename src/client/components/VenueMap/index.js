// Imports
import React, { Component } from 'react';

// CSS
import { firstAttempt } from '../../data/mapStyles';
import './index.scss';

// Images
import you from '../../img/you.svg';

/*
  VenueMap
  <VenueMap/>
*/

class VenueMap extends Component {
  constructor(props) {
    super(props);

    const mapCenter = new google.maps.LatLng(35.992729, -78.903970); // eslint-disable-line no-undef

    this.state = {
      mapProps: {
        center: mapCenter,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP // eslint-disable-line no-undef
      },
      map: null
    };
  }

  componentDidMount() {
    this.setMap();
  }

  setMap() {
    const map = new google.maps.Map(document.getElementById('googleMap'), this.state.mapProps); // eslint-disable-line no-undef
    map.set('styles', firstAttempt);
    const fifteenMile = this.createCircle(15000, '#0066CC');
    fifteenMile.setMap(map);
    const tenMile = this.createCircle(10000, '#CDE1F7');
    tenMile.setMap(map);
    const fiveMile = this.createCircle(5000, '#FF9900');
    fiveMile.setMap(map);
    const marker = new google.maps.Marker({ position: this.state.mapProps.center, icon: you }); // eslint-disable-line no-undef
    marker.setMap(map);
    this.setState({ map });
  }

  // componentWillReceiveProps(nextProps) {
  //
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //
  // }

  setMarkers() {
    // this.props.venues.map((venue) => {
    //   venue.map
    // });
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

VenueMap.propTypes = {
  venues: React.PropTypes.array
};

export default VenueMap;
