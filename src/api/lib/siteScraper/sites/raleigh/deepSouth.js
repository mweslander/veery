'use strict';

const url = 'https://www.deepsouththebar.com/calendar/';

function getEventDetails(dayOfWeek, $) {
  return $(dayOfWeek).map((i, day) => {
    const wrappedDay = $(day);

    const startDate = wrappedDay
      .find('.dtstart span')
      .attr('title');
    const startTime = wrappedDay
      .find('.one-event .start-time')
      .text();
    const title = wrappedDay
      .find('.one-event .headliners a')
      .text();

    if (!startTime) { return null; }
    if (title.indexOf('Mic') < 0) { return null; }

    return {
      startDate,
      startTime,
      title
    };
  });
}

function deepSouth($) {
  const tuesdays = getEventDetails('.Tuesday', $).toArray();
  const wednesdays = getEventDetails('.Wednesday', $).toArray();

  const events = [].concat.apply(tuesdays, wednesdays);

  const venue = {
    name: 'Deep South The Bar',
    address: '430 S Dawson St',
    city: 'Raleigh',
    state: 'NC',
    zipCode: 27601,
    latitude: 35.774731,
    longitude: -78.643929
  };

  return {
    events,
    venue
  };
}

module.exports = {
  run: deepSouth,
  url
};
