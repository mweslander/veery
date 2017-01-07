'use strict';

function itBehavesLike(sharedExample) {
  switch (sharedExample) {
  default:
    throw new Error('That shared example is not listed');
  }
}

module.exports = {
  itBehavesLike
};
