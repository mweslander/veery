'use strict';

import React from 'react';

import {
  createVenue
} from '../../../../support/spec/specHelper';
import VenueMap from './index';
import googleMapsService from '../../services/googleMaps';

function aValidListenerCreation(listenerCall, toggleSearchThisAreaButton) {
  const callback = listenerCall.args[1];
  callback();
  const [params] = toggleSearchThisAreaButton.firstCall.args;
  expect(params).to.eq(true);
}

describe('VenueMap', function() {
  let addListener;
  let addListenerOnce;
  let getCurrentPosition;
  let latLng;
  let map;
  let mapInstance;
  let mockLatitudeMin;
  let mockLatitudeMax;
  let mockLongitudeMin;
  let mockLongitudeMax;
  let searchForVenues;
  let setMap;
  let venues;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    // Google Methods
    mockLatitudeMin = faker.address.latitude();
    mockLatitudeMax = faker.address.latitude();
    mockLongitudeMin = faker.address.longitude();
    mockLongitudeMax = faker.address.longitude();

    const getBounds = this.sandbox.stub().returns({
      b: {
        b: mockLongitudeMin,
        f: mockLongitudeMax
      },
      f: {
        b: mockLatitudeMin,
        f: mockLatitudeMax
      }
    });

    const mockLatitude = faker.address.latitude();
    const mockLongitude = faker.address.longitude();
    const mockZoom = faker.random.number();
    const mockCenter = {
      lat: () => {
        return mockLatitude;
      },
      lng: () => {
        return mockLongitude;
      }
    };
    const set = this.sandbox.stub();

    addListener = this.sandbox.stub();
    addListenerOnce = this.sandbox.stub();
    mapInstance = {
      addListener,
      center: mockCenter,
      getBounds,
      set,
      zoom: mockZoom
    };
    setMap = this.sandbox.stub();

    const circle = this.sandbox.stub().returns({ setMap });
    const googleEvent = { addListenerOnce };
    const mapTypeId = {
      ROADMAP: faker.random.word()
    };
    const marker = this.sandbox.stub().returns({
      addListener,
      setMap
    });

    getCurrentPosition = this.sandbox.stub();
    latLng = this.sandbox.stub().returns(mockCenter);
    map = this.sandbox.stub().returns(mapInstance);

    const mockGoogle = {
      maps: {
        event: googleEvent,
        Circle: circle,
        LatLng: latLng,
        Map: map,
        MapTypeId: mapTypeId,
        Marker: marker
      }
    };
    const mockNavigator = {
      geolocation: {
        getCurrentPosition
      }
    };

    global.google = mockGoogle;
    global.navigator = mockNavigator;

    // Others
    searchForVenues = this.sandbox.stub();

    const promises = [];

    for (let i = 10; i > 0; i--) {
      promises.push(createVenue());
    }

    return Promise.all(promises)
      .then((createdVenues) => {
        venues = createdVenues;
      });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('componentDidMount', function() {
    let generateMap;
    let venueMap;

    beforeEach(function() {
      const initialProps = {
        focusedVenue: {},
        searchForVenues,
        venues: []
      };

      generateMap = this.sandbox.stub().returns(mapInstance);
      venueMap = shallow(<VenueMap {...initialProps} />);
      venueMap.instance().generateMap = generateMap;
      venueMap.instance().componentDidMount();
    });

    context('when the current position is found', function() {
      let newLatitude;
      let newLongitude;
      let newPosition;
      let successCallback;

      beforeEach(function() {
        newLatitude = faker.address.latitude();
        newLongitude = faker.address.longitude();

        newPosition = {
          coords: {
            latitude: newLatitude,
            longitude: newLongitude
          }
        };

        successCallback = getCurrentPosition.firstCall.args[0];
      });

      it('generates a new map', function() {
        successCallback(newPosition);
        expect(generateMap.calledOnce).to.be.true;
      });

      it('calls searchForVenues based off the map bounds', function() {
        successCallback(newPosition);
        const generateMapCallback = generateMap.firstCall.args[2];
        generateMapCallback(mapInstance);
        const callback = addListenerOnce.firstCall.args[2];
        callback();
        const [params] = searchForVenues.firstCall.args;
        expect(params.latitudeMin).to.eq(mockLatitudeMin);
        expect(params.latitudeMax).to.eq(mockLatitudeMax);
        expect(params.longitudeMin).to.eq(mockLongitudeMin);
        expect(params.longitudeMax).to.eq(mockLongitudeMax);
      });

      it('updates the map props with new coordinates', function() {
        expect(latLng.callCount).to.eq(1);
        successCallback(newPosition);
        expect(latLng.callCount).to.eq(2);
        const [latitude, longitude] = latLng.secondCall.args;
        expect(latitude).to.eq(newLatitude);
        expect(longitude).to.eq(newLongitude);
      });
    });

    context('when the current position is not found', function() {
      let failureCallback;

      beforeEach(function() {
        failureCallback = getCurrentPosition.firstCall.args[1];
      });

      it('generates a new map', function() {
        failureCallback();
        expect(generateMap.calledOnce).to.be.true;
      });

      it('calls searchForVenues based off the map bounds', function() {
        failureCallback();
        const generateMapCallback = generateMap.firstCall.args[2];
        generateMapCallback(mapInstance);
        const callback = addListenerOnce.firstCall.args[2];
        callback();
        const [params] = searchForVenues.firstCall.args;
        expect(params.latitudeMin).to.eq(mockLatitudeMin);
        expect(params.latitudeMax).to.eq(mockLatitudeMax);
        expect(params.longitudeMin).to.eq(mockLongitudeMin);
        expect(params.longitudeMax).to.eq(mockLongitudeMax);
      });

      it('does not update the map props with new coordinates', function() {
        expect(latLng.callCount).to.eq(1);
        failureCallback();
        expect(latLng.callCount).to.eq(1);
      });
    });
  });

  describe('componentWillReceiveProps', function() {
    let buildBaseMap;
    let initialProps;
    let updateMapPropsWithNewCoordinates;

    beforeEach(function() {
      buildBaseMap = this.sandbox.stub(googleMapsService, 'buildBaseMap').returns({
        addListener: this.sandbox.stub()
      });
      initialProps = {
        focusedVenue: {},
        searchForVenues,
        venues
      };
      updateMapPropsWithNewCoordinates = this.sandbox.stub();
    });

    context('when the venues coming down are different', function() {
      let venueMap;

      beforeEach(function() {
        const nextProps = {
          ...initialProps,
          venues: [venues[0], venues[4], venues[6]]
        };

        venueMap = shallow(<VenueMap {...initialProps} />);
        venueMap.instance().setMarkers = this.sandbox.stub();
        venueMap.instance().updateMapPropsWithNewCoordinates = updateMapPropsWithNewCoordinates;
        return venueMap.instance().componentWillReceiveProps(nextProps);
      });

      it('does not updateMapPropsWithNewCoordinates', function() {
        expect(updateMapPropsWithNewCoordinates.calledOnce).to.be.false;
      });

      it('generates a new map', function() {
        expect(buildBaseMap.calledOnce).to.be.true;
      });
    });

    context('when the venues coming down are not different', function() {
      context('when the focusedVenue is not different', function() {
        let venueMap;

        beforeEach(function() {
          const nextProps = {
            ...initialProps,
            venues: _.sortBy(venues, ['latitude'])
          };

          venueMap = shallow(<VenueMap {...initialProps} />);
          venueMap.instance().setMarkers = this.sandbox.stub();
          venueMap.instance().updateMapPropsWithNewCoordinates = updateMapPropsWithNewCoordinates;
          return venueMap.instance().componentWillReceiveProps(nextProps);
        });

        it('does not updateMapPropsWithNewCoordinates', function() {
          expect(updateMapPropsWithNewCoordinates.calledOnce).to.be.false;
        });

        it('does not generate a new map', function() {
          expect(buildBaseMap.calledOnce).to.be.false;
        });
      });

      context('when the focusedVenue is different', function() {
        let venueMap;

        beforeEach(function() {
          const nextProps = {
            ...initialProps,
            venues: _.sortBy(venues, ['latitude']),
            focusedVenue: venues[2]
          };

          venueMap = shallow(<VenueMap {...initialProps} />);
          venueMap.instance().setMarkers = this.sandbox.stub();
          venueMap.instance().updateMapPropsWithNewCoordinates = updateMapPropsWithNewCoordinates;
          return venueMap.instance().componentWillReceiveProps(nextProps);
        });

        it('updates map props with new coordinates', function() {
          expect(updateMapPropsWithNewCoordinates.calledOnce).to.be.true;
        });

        it('generates a new map', function() {
          const callback = updateMapPropsWithNewCoordinates.firstCall.args[1];
          callback();
          expect(buildBaseMap.calledOnce).to.be.true;
        });
      });
    });
  });

  describe('generateMap', function() {
    let toggleSearchThisAreaButton;

    beforeEach(function() {
      toggleSearchThisAreaButton = this.sandbox.stub();
    });

    context('without passed down venues', function() {
      let generatedMap;
      let venueMap;

      beforeEach(function() {
        const initialProps = {
          focusedVenue: {},
          searchForVenues,
          venues: []
        };

        venueMap = shallow(<VenueMap {...initialProps} />);
        venueMap.instance().toggleSearchThisAreaButton = toggleSearchThisAreaButton;
        venueMap.instance().generateMap();
        generatedMap = venueMap.state().map;
      });

      it('adds a callback to the zoom_changed listener that will call toggleSearchThisAreaButton upon a new zoom', function() {
        return aValidListenerCreation(addListener.firstCall, toggleSearchThisAreaButton, mapInstance);
      });

      it('adds a callback to the dragend listener that will call toggleSearchThisAreaButton upon a dragend', function() {
        return aValidListenerCreation(addListener.secondCall, toggleSearchThisAreaButton, mapInstance);
      });

      it('sets the state to the new map', function() {
        expect(generatedMap).to.equal(mapInstance);
      });
    });

    context('with passed down venues', function() {
      let generatedMap;
      let venueMap;

      beforeEach(function() {
        const initialProps = {
          focusedVenue: {},
          searchForVenues,
          updateFocusedVenue: this.sandbox.stub(),
          venues
        };

        venueMap = shallow(<VenueMap {...initialProps} />);
        venueMap.instance().addMarkerListener = this.sandbox.stub();
        venueMap.instance().toggleSearchThisAreaButton = toggleSearchThisAreaButton;
        venueMap.instance().generateMap();
        generatedMap = venueMap.state().map;
      });

      it('adds a callback to the zoom_changed listener that will call toggleSearchThisAreaButton upon a new zoom', function() {
        // Because generateMap is called from componentWillReceiveProps initially
        const call = addListener.getCall(addListener.callCount - 2);
        return aValidListenerCreation(call, toggleSearchThisAreaButton, mapInstance);
      });

      it('adds a callback to the dragend listener that will call toggleSearchThisAreaButton upon a dragend', function() {
        const call = addListener.getCall(addListener.callCount - 1);
        return aValidListenerCreation(call, toggleSearchThisAreaButton, mapInstance);
      });

      it('sets the state to the new map', function() {
        expect(generatedMap).to.equal(mapInstance);
      });
    });
  });

  describe('searchThisArea', function() {
    let newLatitude;
    let newLongitude;
    let newZoom;
    let venueMap;

    beforeEach(function() {
      const initialProps = {
        focusedVenue: {},
        searchForVenues,
        venues: []
      };

      newLatitude = faker.address.latitude();
      newLongitude = faker.address.longitude();
      newZoom = faker.random.number();

      const newMockCenter = {
        lat: () => {
          return newLatitude;
        },
        lng: () => {
          return newLongitude;
        }
      };

      const newMapInstance = {
        ...mapInstance,
        center: newMockCenter,
        zoom: newZoom
      };

      venueMap = shallow(<VenueMap {...initialProps} />);
      venueMap.setState({ map: newMapInstance });
      return venueMap.instance().searchThisArea();
    });

    it('sets the state to a new center with a new latitude, longitude, and zoom', function() {
      const { mapProps } = venueMap.state();
      const [latitude, longitude] = latLng.secondCall.args;
      expect(latitude).to.equal(newLatitude);
      expect(longitude).to.equal(newLongitude);
      expect(mapProps.zoom).to.equal(newZoom);
    });

    it('calls searchForVenues based upon the map bounds', function() {
      const [params] = searchForVenues.firstCall.args;
      expect(params.latitudeMin).to.eq(mockLatitudeMin);
      expect(params.latitudeMax).to.eq(mockLatitudeMax);
      expect(params.longitudeMin).to.eq(mockLongitudeMin);
      expect(params.longitudeMax).to.eq(mockLongitudeMax);
    });
  });

  describe('updateMapPropsWithNewCoordinates', function() {
    let callback;
    let newLatitude;
    let newLongitude;
    let venueMap;

    beforeEach(function() {
      const initialProps = {
        focusedVenue: {},
        searchForVenues,
        venues: []
      };

      callback = this.sandbox.spy();
      newLatitude = faker.address.latitude();
      newLongitude = faker.address.longitude();

      venueMap = shallow(<VenueMap {...initialProps} />);
      return venueMap.instance().updateMapPropsWithNewCoordinates({
        latitude: newLatitude,
        longitude: newLongitude
      }, callback);
    });

    it('sets the state to a new center with the new latitude and longitude', function() {
      const [latitude, longitude] = latLng.secondCall.args;
      expect(latitude).to.equal(newLatitude);
      expect(longitude).to.equal(newLongitude);
    });

    it('calls the callback', function() {
      expect(callback.calledOnce).to.be.true;
    });
  });

  describe('addMarkerListener', function() {
    let mockVenue;
    let updateFocusedVenue;
    let updateMapPropsWithNewCoordinates;
    let venueMap;

    beforeEach(function() {
      updateFocusedVenue = this.sandbox.stub();

      const initialProps = {
        focusedVenue: {},
        searchForVenues,
        updateFocusedVenue,
        venues: []
      };

      const newMarkerInstance = {
        addListener,
        setMap
      };

      return createVenue()
        .then((newVenue) => {
          mockVenue = newVenue;
          updateMapPropsWithNewCoordinates = this.sandbox.stub();
          venueMap = shallow(<VenueMap {...initialProps} />);
          venueMap.instance().updateMapPropsWithNewCoordinates = updateMapPropsWithNewCoordinates;
          return venueMap.instance().addMarkerListener(newMarkerInstance, mockVenue);
        });
    });

    it('adds a listener that calls updateMapPropsWithNewCoordinates with a callback that calls updateFocusedVenue', function() {
      const callback = addListener.firstCall.args[1];
      callback();
      const [newMapProps, secondCallback] = updateMapPropsWithNewCoordinates.firstCall.args;
      expect(newMapProps.latitude).to.equal(mockVenue.latitude);
      expect(newMapProps.longitude).to.equal(mockVenue.longitude);
      secondCallback();
      const [sameVenue] = updateFocusedVenue.firstCall.args;
      expect(sameVenue).to.equal(mockVenue);
    });
  });
});
