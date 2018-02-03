'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../utils/searchForOpenMicNights');
const url = 'http://abbeyroadnc.com/open-mic/';
const Venue = require('../../../../app/models/venue');

function abbeyRoad($) {
  const events = (venue) => {
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
  };

  return Venue
    .findOne({ name: 'Abbey Road Tavern & Grill - Apex' })
    .then((venue) => events(venue));
}

module.exports = {
  run: abbeyRoad,
  url
};
