'use strict';

const buildNoJSGoogleCalendarEvents = require('../../../../../utils/buildNoJSGoogleCalendarEvents');
const Venue = require('../../../../../app/models/venue');

const url = 'https://calendar.google.com/calendar/htmlembed?height=700&wkst=1&bgcolor=%23FFFFFF&src=cor420biecbsvvs827a7m02j6c@group.calendar.google.com&color=%238C500B&ctz=America/Chicago';

function giddyUps($) {
  const events = (venue) => {
    const title = 'Open Mic Night With Shannon Nelson';
    return buildNoJSGoogleCalendarEvents($, title, venue);
  };

  return Venue
    .findOne({ name: 'Giddy Ups', city: 'Austin' })
    .then((venue) => events(venue));
}

module.exports = {
  run: giddyUps,
  url
};
