'use strict';

import { firstAttempt } from '../data/mapStyles';
import you from '../img/you.svg';
import '@google/maps';

const blue = '#0066CC';
const orange = '#FF9900';
const orangeBright = '#b36b00';
const orangeBurnt = '#b36b00';
const white = '#CDE1F7';

function buildMarkerIcon(venueId, currentFocusedVenue) {
  const path = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
  const { fillColor, fillOpacity, scale } = currentFocusedVenue._id === venueId ?
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

function createCircle(radius, color, center) {
  return new google.maps.Circle({ // eslint-disable-line no-undef
    center,
    radius,
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.1
  });
}

function buildMarker(map, icon, venue, focusedVenue = {}) {
  const markerIcon = icon || buildMarkerIcon(venue._id, focusedVenue);
  const position = {
    lat: venue.latitude,
    lng: venue.longitude
  };

  return new google.maps.Marker({ // eslint-disable-line no-undef
    icon: markerIcon,
    map,
    position
  });
}

function buildBaseMap(mapProps) {
  const map = new google.maps.Map(document.getElementById('googleMap'), mapProps); // eslint-disable-line no-undef
  const center = mapProps.center;

  const fifteenMile = createCircle(15000, blue, center);
  const tenMile = createCircle(10000, white, center);
  const fiveMile = createCircle(5000, orange, center);
  const venueBounds = {
    latitude: center.lat(),
    longitude: center.lng()
  };
  const marker = buildMarker(map, you, venueBounds);

  map.set('styles', firstAttempt);
  fifteenMile.setMap(map);
  tenMile.setMap(map);
  fiveMile.setMap(map);
  marker.setMap(map);

  return map;
}

function getBounds(map) {
  const { b, f } = map.getBounds();

  return {
    latitudeMin: f.b,
    latitudeMax: f.f,
    longitudeMin: b.b,
    longitudeMax: b.f
  };
}

export default {
  buildBaseMap,
  buildMarker,
  buildMarkerIcon,
  createCircle,
  getBounds
};
