'use strict';

function isEnvironment(env) {
  let environments = env;
  if (typeof env === 'string') { environments = [env]; }
  return environments.indexOf(process.env.NODE_ENV) > -1;
}

module.exports = isEnvironment;
