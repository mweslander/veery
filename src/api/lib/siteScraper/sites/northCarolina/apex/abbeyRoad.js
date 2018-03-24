'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';

function abbeyRoad($, venue) {
  const micNights = searchForOpenMicNights('OPEN MIC - APEX', $, 'p');
  const noMoreTuesdays = $(micNights[0]).text().indexOf('Tuesday') < 0;

  if (noMoreTuesdays) { throw new Error('Abbey Road - Apex no longer has open mic nights on Tuesdays'); }

  return [{
    frequency: 'weekly',
    startDate: moment().isoWeekday(2).format('MM-DD-YYYY'),
    startTime: '8pm - 11pm',
    title: 'OPEN MIC - APEX',
    type: 'open',
    venue: venue._id
  }];
}

module.exports = {
  run: abbeyRoad,
  url,
  venueDetails: { name: 'Abbey Road Tavern & Grill - Apex' }
};
