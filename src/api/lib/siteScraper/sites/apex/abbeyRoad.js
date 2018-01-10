'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';

function abbeyRoad($) {
  const micNights = searchForOpenMicNights('OPEN MIC - APEX', $, 'p');
  const noMoreTuesdays = $(micNights[0]).text().indexOf('Tuesday') < 0;

  if (noMoreTuesdays) { throw new Error('Abbey Road - Apex no longer has open mic nights on Tuesdays') }

  const events = [{
    frequency: 'weekly',
    startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
    startTime: '8pm - 11pm',
    title: 'OPEN MIC - APEX',
    type: 'open'
  }];

  const venue = {
    name: 'Abbey Road Tavern & Grill - Apex',
    address: '1700 Center St',
    city: 'Apex',
    state: 'NC',
    zipCode: 27502,
    latitude: 35.725996,
    longitude: -78.827330
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
