'use strict';

function log(message) {
  console.log('----------------------------------'); // eslint-disable-line
  console.log(message); // eslint-disable-line
  console.log('----------------------------------'); // eslint-disable-line
}

function isEnvironment(env) {
  let environments = env;
  if (typeof env === 'string') { environments = [env]; }
  return environments.indexOf(process.env.NODE_ENV) > -1;
}

module.exports = {
  isEnvironment,
  log
};
