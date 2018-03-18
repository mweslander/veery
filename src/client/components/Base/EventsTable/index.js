// Imports
import React from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router';
import moment from 'moment';

// PropTypes
const propTypes = {
  events: PropTypes.array,
  fromVenue: PropTypes.bool,
  isMobileScreen: PropTypes.bool
};

/*
  EventsTable
  <EventsTable/>
*/

function EventsTable({ events, fromVenue, isMobileScreen }) {
  return (
    <table className="c-table c-table--striped">
      <thead className="c-table__head">
        <tr className="c-table__row c-table__row--heading">
          <th className="c-table__cell">Title</th>
          <th className="c-table__cell">Start Date</th>
          {!isMobileScreen &&
            <th className="c-table__cell">Start Time</th>}
          {!fromVenue && !isMobileScreen &&
            <th className="c-table__cell">Venue</th>}
          <th className="c-table__cell" />
        </tr>
      </thead>

      <tbody className="c-table__body">
        {events.length === 0 &&
          <h3>No events have been added!</h3>}
        {events.map((event) => {
          let deletionLink = `/admin/events/all/${event._id}/delete`;

          if (fromVenue) {
            deletionLink = `/admin/venues/${event.venue}/events/${event._id}/delete`;
          }

          return (
            <tr
              key={event._id}
              className="c-table__row"
            >
              <td className="c-table__cell">{event.title}</td>
              <td className="c-table__cell">{moment(event.startDate).format('MM-DD-YY')}</td>
              {!isMobileScreen &&
                <td className="c-table__cell">{event.startTime}</td>}
              {!isMobileScreen && !fromVenue &&
                <td className="c-table__cell">
                  <Link className="c-link" to={`/admin/venues/${event.venue._id}`}>{event.venue.name}</Link>
                </td>}
              <td className="c-table__cell c-admin-venues-show-all__grid o-grid">
                <Link className="c-link o-grid__cell" to={deletionLink}>destroy</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

EventsTable.propTypes = propTypes;

export default EventsTable;
