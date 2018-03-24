'use strict';

const buildNoJSGoogleCalendarEvents = require('../../../../../utils/buildNoJSGoogleCalendarEvents');

const url = 'https://calendar.google.com/calendar/htmlembed?showTitle=0&height=600&wkst=1&bgcolor=%23FFFFFF&src=housewineaustin.com_9lbbea6dpl6miqnq6rp5vkk318%40group.calendar.google.com&color=%23853104&ctz=America%2FChicago';

function houseWineAustin($, venue) {
  return buildNoJSGoogleCalendarEvents($, 'Open Mic', venue);
}

module.exports = {
  run: houseWineAustin,
  url,
  venueDetails: {
    city: 'Austin',
    name: 'House Wine'
  }
};
