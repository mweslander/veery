'use strict';

const create = require('./create');
const destroy = require('./destroy');
const showAll = require('./showAll');
const update = require('./update');

module.exports = function(api) {
  create(api);
  destroy(api);
  showAll(api);
  update(api);
};
