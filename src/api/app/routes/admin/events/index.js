'use strict';

const create = require('./create');
const destroy = require('./destroy');
const showAll = require('./showAll');

module.exports = function(api) {
  create(api);
  destroy(api);
  showAll(api);
};
