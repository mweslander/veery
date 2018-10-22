'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';

function abbeyRoad($, venue) {
  const micNights = searchForOpenMicNights('OPEN MIC - CARY', $, 'p');
  const noMoreWednesdays = $(micNights[0]).text().indexOf('Wednesday') < 0;

  if (noMoreWednesdays) { throw new Error('Abbey Road - Cary no longer has open mic nights on Wednesdays'); }

  return [{
    ...buildWeekly(3, venue),
    startTime: '9pm - 12am',
    title: 'OPEN MIC - CARY',
    type: 'open'
  }];
}

module.exports = {
  run: abbeyRoad,
  url,
  venueDetails: { name: 'Abbey Road Tavern & Grill - Cary' }
};
