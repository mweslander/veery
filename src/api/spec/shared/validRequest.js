'use strict';

function validRequest(statusCode) {
  describe('a valid request', function() {
    it(`responds with a ${statusCode}`, function() {
      return this.promise
        .then((response) => {
          expect(response).to.have.status(statusCode);
        });
    });
  });
}

module.exports = validRequest;
