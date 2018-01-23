'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';

function abbeyRoad($) {
  const micNights = searchForOpenMicNights('OPEN MIC - CARY', $, 'p');
  const noMoreWednesdays = $(micNights[0]).text().indexOf('Wednesday') < 0;

  if (noMoreWednesdays) { throw new Error('Abbey Road - Cary no longer has open mic nights on Wednesdays'); }

  const events = [{
    frequency: 'weekly',
    startDate: moment().isoWeekday(3).format('MM-DD-YYYY'),
    startTime: '9pm - 12am',
    title: 'OPEN MIC - CARY',
    type: 'open'
  }];

  const venue = {
    name: 'Abbey Road Tavern & Grill - Cary',
    address: '1195 W Chatham St',
    city: 'Cary',
    state: 'NC',
    zipCode: 27513,
    latitude: 35.770850,
    longitude: -78.807000
  };

  return {
    events,
    venue
  };
}

module.exports = {
  run: abbeyRoad,
  url
};
