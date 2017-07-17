'use strict';

const bcrypt = require('bcrypt-nodejs');

function hash(str) {
  const SALT_FACTOR = 5;

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) { return reject(err); }
      bcrypt.hash(str, salt, null, (errr, _hash) => {
        if (errr) { return reject(errr); }
        resolve(_hash);
      });
    });
  });
}

function compare(str, _hash) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(str, _hash, (err, result) => {
      if (err) { return reject(err); }
      resolve(result);
    })
  );
}

module.exports = {
  compare,
  hash
};
