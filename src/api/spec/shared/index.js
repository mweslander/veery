'use strict';

const invalidRequest = require('./invalidRequest');
const protectedEndpoint = require('./protectedEndpoint');
const validRequest = require('./validRequest');

function itBehavesLike(sharedExample, options = {}) {
  switch (sharedExample) {
  case 'a protected DELETE endpoint':
    protectedEndpoint('DELETE');
    break;
  case 'a protected GET endpoint':
    protectedEndpoint('GET');
    break;
  case 'a protected PATCH endpoint':
    protectedEndpoint('PATCH');
    break;
  case 'a protected POST endpoint':
    protectedEndpoint('POST');
    break;
  case 'a protected PUT endpoint':
    protectedEndpoint('PUT');
    break;
  case 'a valid request':
    validRequest(options.statusCode);
    break;
  case 'an invalid request':
    invalidRequest(options.statusCode);
    break;
  default:
    throw new Error('That shared example is not listed');
  }
}

module.exports = {
  itBehavesLike
};
