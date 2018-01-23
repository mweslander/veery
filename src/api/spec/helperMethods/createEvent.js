'use strict';

const Event = require('../../app/models/event');

function buildEvent() {
  return {
    frequency: 'one time',
    startDate: faker.date.future(),
    startTime: '9:00 pm',
    title: faker.commerce.productName()
  };
}

function createEvent(options = {}) {
  const params = Object.assign({}, buildEvent(), options);

  return (new Event(params)).save();
}

module.exports = createEvent;
