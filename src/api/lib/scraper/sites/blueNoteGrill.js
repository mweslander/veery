'use strict';

const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');
const Event = require('../../../app/models/event.js');
const Venue = require('../../../app/models/venue.js');

const url = 'http://www.thebluenotegrill.com/events/';

function blueNoteGrill() {
  return new Promise((resolve, reject) => {
    return request(url, (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);

        const blueJams = $('.event').filter((i, event) => {
          const title = $(event)
            .find('h2')
            .children('a')
            .text();

          return title.toLowerCase().indexOf('blues jam') !== -1;
        });

        const futureEvents = blueJams.filter((i, blueJam) => {
          const dateTime = $(blueJam).find('.date-time');
          const startDate = dateTime
            .children('.event-date')
            .text();

          return new Date(startDate) > new Date();
        });

        if (futureEvents.length === 0) { resolve(); }

        const attributes = futureEvents.map((i, blueJam) => {
          const title = $(blueJam)
            .find('h2')
            .children('a')
            .text();
          const dateTime = $(blueJam).find('.date-time');
          const startDate = dateTime
            .children('.event-date')
            .text();
          const startTime = dateTime
            .children('.event-time')
            .text();

          return {
            startDate,
            startTime,
            title,
            type: 'open'
          };
        });

        const venue = {
          name: 'Blue Note Grill',
          address: '709 Washington Street',
          city: 'Durham',
          state: 'NC',
          zipCode: 27704,
          latitude: 36.004379,
          longitude: -78.902946
        };

        new Venue(venue)
          .save((err, savedVenue) => {
            return attributes
              .toArray()
              .forEach((event, i) => {
                event.venue = mongoose.Types.ObjectId(savedVenue._id);
                new Event(event)
                  .save((err) => {
                    if (err) { reject(err.message); }
                    if (i === attributes.length - 1) { resolve(); }
                  });
              });
          });
      }
    });
  });
}

module.exports = blueNoteGrill();
