'use strict';

if (process.env.NODE_ENV === 'test') {
  module.exports = require('./environments/test');
} else {
  module.exports = require('./environments/development');
}
