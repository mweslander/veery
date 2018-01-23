'use strict';

function invalidRequest(statusCode) {
  describe('an invalid request', function() {
    it(`responds with a ${statusCode}`, function() {
      return this.promise
        .then(expect.fail)
        .catch((res) => {
          expect(res).to.have.status(statusCode);
        });
    });
  });
}

module.exports = invalidRequest;
