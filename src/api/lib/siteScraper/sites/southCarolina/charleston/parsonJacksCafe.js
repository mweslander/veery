'use strict';

const buildNoJSGoogleCalendarEvents = require('../../../../../utils/buildNoJSGoogleCalendarEvents');
const url = 'https://calendar.google.com/calendar/htmlembed?src=njf863i5rgu12b5j6kuvdsuv88@group.calendar.google.com&amp;ctz=America/New_York&dates=20180401/20190501';

function parsonJacksCafe($, venue) {
  const title = 'Open Mic Night';
  return buildNoJSGoogleCalendarEvents($, title, venue);
}

module.exports = {
  run: parsonJacksCafe,
  url,
  venueDetails: {
    city: 'Charleston',
    name: 'Parson Jack\'s Cafe'
  }
};
