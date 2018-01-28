import React from 'react';
import InviteVenueAdmin from './index';

describe('<InviteVenueAdmin />', function() {
  let props;

  beforeEach(function() {
    this.sandbox = sandbox.create();
    props = {
      router: {
        push: this.sandbox.stub()
      },
      venues: []
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('handleCheckboxChange', function() {
    let id;
    let inviteNewAdmin;

    beforeEach(function() {
      id = faker.random.number();
      inviteNewAdmin = shallow(<InviteVenueAdmin {...props} />);
    });

    context('when the box is checked', function() {
      let checkboxParams;

      beforeEach(function() {
        checkboxParams = {
          target: {
            checked: true,
            value: id
          }
        };
        return inviteNewAdmin.instance().handleCheckboxChange(checkboxParams);
      });

      it('add the id to state.venueIdsForSubmission', function() {
        expect(inviteNewAdmin.state().venueIdsForSubmission).to.include(id);
      });
    });

    context('when the box is not checked', function() {
      let checkboxParams;

      beforeEach(function() {
        checkboxParams = {
          target: {
            checked: false,
            value: id
          }
        };
        return inviteNewAdmin.instance().handleCheckboxChange(checkboxParams);
      });

      it('does not add the id to state.venueIdsForSubmission', function() {
        expect(inviteNewAdmin.state().venueIdsForSubmission).not.to.include(id);
      });
    });
  });
});
