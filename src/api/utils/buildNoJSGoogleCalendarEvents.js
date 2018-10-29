'use strict';

const _ = require('lodash');

function buildEventCallback($, title, venue) {
  return function(i, micNight) {
    const columnIndex = $(micNight)
      .closest('td')
      .first()
      .index();

    const previousRow = $(micNight)
      .closest('tr')
      .prev();

    const correspondingTableData = $(previousRow)
      .children()
      .eq(columnIndex);

    const classes = correspondingTableData.attr('class');
    // Because `classes` might be something like 'null cell-today'
    if (!classes || classes.indexOf(null, undefined) > -1) { return null; } // eslint-disable-line no-undefined

    const previousMonthData = classes.indexOf('date-not-month') > -1;
    if (previousMonthData) { return null; }

    const startDay = correspondingTableData.text();
    const periodRange = $('.period-range').text();
    const startDate = `${startDay} ${periodRange}`;

    const startTime = $(micNight)
      .siblings('.event-time')
      .first()
      .text();

    if (!startTime) { return null; }

    return {
      startDate,
      startTime,
      title,
      venue: venue._id
    };
  };
}

function buildNoJSGoogleCalendarEvents($, title, venue) {
  const micNights = $(`.event-summary:contains(${title})`);

  const events =  micNights
    .map(buildEventCallback($, title, venue))
    .toArray();

  return _.compact(events);
}

module.exports = buildNoJSGoogleCalendarEvents;
