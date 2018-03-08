'use strict';

const _ = require('lodash');
const buildNoJSGoogleCalendarEvents = require('../../../../../utils/buildNoJSGoogleCalendarEvents');
const Venue = require('../../../../../app/models/venue');

const url = 'https://calendar.google.com/calendar/htmlembed?showPrint=0&showCalendars=0&mode=MONTH&height=800&wkst=1&bgcolor=%23FFFFFF&src=mastergohring.com_uihnkkllh9o5en9mkbis6hpao0@group.calendar.google.com&color=%23182C57&ctz=America/Chicago';

function kickButtCoffee($) {
  const events = (venue) => {
    const wednesdays = buildNoJSGoogleCalendarEvents(
      $,
      'Kick Butt Comedy Open Mic',
      venue
    );
    const thursdays = buildNoJSGoogleCalendarEvents(
      $,
      'Kick Butt Music Open Mic',
      venue
    );

    return _.flatten([wednesdays, thursdays]);
  };

  return Venue
    .findOne({ name: 'Kick Butt Café', city: 'Austin' })
    .then((venue) => events(venue));
}

module.exports = {
  run: kickButtCoffee,
  url
};
