'use strict';

function protectedEndpoint(requestType) {
  describe(`a protected ${requestType} endpoint`, function() {
    it('does not return a 401 when the user is signed in', function() {
      if (!this.promise) {
        throw new Error('There is no HTTP promise provided');
      } else if (!this.agent) {
        throw new Error('There is no agent provided');
      }

      switch (requestType) {
      case 'DELETE':
        return this.promise
          .then((res) => expect(res.status).to.not.eq(401))
          .catch((res) => expect(res.status).to.not.eq(401));
      case 'PATCH':
        return this.promise
          .then((res) => expect(res.status).to.not.eq(401))
          .catch((res) => expect(res.status).to.not.eq(401));
      case 'POST':
        return this.promise
          .then((res) => expect(res.status).to.not.eq(401))
          .catch((res) => expect(res.status).to.not.eq(401));
      case 'PUT':
        return this.promise
          .then((res) => expect(res.status).to.not.eq(401))
          .catch((res) => expect(res.status).to.not.eq(401));
      default:
        return this.promise
          .then((res) => expect(res.status).to.not.eq(401))
          .catch((res) => expect(res.status).to.not.eq(401));
      }
    });

    it('returns a 401 when not the user is not signed in', function() {
      return this.agent
        .get('/api/sign-out')
        .then(() => {
          switch (requestType) {
          case 'DELETE':
            return this.promise
              .then(expect.fail)
              .catch((res) => expect(res.status).to.eq(401));
          case 'PATCH':
            return this.promise
              .then(expect.fail)
              .catch((res) => expect(res.status).to.eq(401));
          case 'POST':
            return this.promise
              .then(expect.fail)
              .catch((res) => expect(res.status).to.eq(401));
          case 'PUT':
            return this.promise
              .then(expect.fail)
              .catch((res) => expect(res.status).to.eq(401));
          default:
            return this.promise
              .then(expect.fail)
              .catch((res) => expect(res.status).to.eq(401));
          }
        });
    });
  });
}

module.exports = protectedEndpoint;
