'use strict';

const moment = require('moment');
const searchForOpenMicNights = require('../../../../../utils/searchForOpenMicNights');
const url = 'http://gizmobrewworks.com/';

function gizmoBrewWorks($, venue) {
  const micNights = searchForOpenMicNights('Open Mic 7-10pm', $, 'p');

  // So I'll be emailed if there are now mic nights
  if (micNights > 6) { throw new Error('Gizmo is now doing mic nights but they are not showing'); }

  return micNights.map((i, night) => {
    const dayAndTime = new Date($(night).children('strong').text());
    // Gizmo is not currently doing open mic nights so that's why 2017
    const startDate = moment(dayAndTime).year(2017).format('MM-DD-YYYY');

    return {
      startDate,
      startTime: '7-10pm',
      title: 'Open Mic',
      type: 'open',
      venue: venue._id
    };
  }).toArray();
}

module.exports = {
  run: gizmoBrewWorks,
  url,
  venueDetails: { name: 'Gizmo Brew Works' }
};
