'use strict';

const buildWeekly = require('../../../../../utils/eventObjects/buildWeekly');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';

function abbeyRoad($, venue) {
  const micNights = searchForOpenMicNights('OPEN MIC - APEX', $, 'p');
  const noMoreTuesdays = $(micNights[0]).text().indexOf('Tuesday') < 0;

  if (noMoreTuesdays) { throw new Error('Abbey Road - Apex no longer has open mic nights on Tuesdays'); }

  return [{
    ...buildWeekly(2, venue),
    startTime: '8pm - 11pm',
    title: 'OPEN MIC - APEX',
    type: 'open'
  }];
}

module.exports = {
  run: abbeyRoad,
  url,
  venueDetails: { name: 'Abbey Road Tavern & Grill - Apex' }
};
