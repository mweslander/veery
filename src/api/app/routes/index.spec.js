'use strict';

const specHelper = require('../../../../support/spec/specHelper');
const app = specHelper.app;

describe('General requests', function() {
  context('when the route does not exist', function() {
    describe('GET /api/member-berries', function() {
      it('will respond with a 404', function() {
        return apiRequest(app)
          .get('/api/member-berries')
          .catch((response) => {
            expect(response.status).to.eq(404);
          });
      });
    });
  });
});
