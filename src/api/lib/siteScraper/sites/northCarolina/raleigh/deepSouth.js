'use strict';

const url = 'https://www.deepsouththebar.com/calendar/';

function getEventDetails(dayOfWeek, $, venueId) {
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
      title,
      venue: venueId
    };
  });
}

function deepSouth($, venue) {
  const tuesdays = getEventDetails('.Tuesday', $, venue._id).toArray();
  const wednesdays = getEventDetails('.Wednesday', $, venue._id).toArray();
  return [].concat.apply(tuesdays, wednesdays);
}

module.exports = {
  run: deepSouth,
  url,
  venueDetails: { name: 'Deep South The Bar' }
};
