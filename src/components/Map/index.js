// Imports
import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

// CSS
import './index.scss';

/*
  Map
  <Map/>
*/

class Map extends Component {
  render() {
    return (
      <div className="map">
        <GoogleMap defaultCenter={{lat: 59.938043, lng: 30.337157}} defaultZoom={9} />
      </div>
    );
  }
}

Map.propTypes = {
  center: React.PropTypes.object,
  zoom: React.PropTypes.number
}

export default Map;
