// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from '../../../Base/Modal';
import RadioButton from '../../../Base/RadioButton';

// Services
import adminVenuesService from '../../../../services/admin/venues';

// PropTypes
import venueFormPropTypes from '../../../../constants/propTypes/adminPanel/venueForm';
const propTypes = {
  ...venueFormPropTypes,
  events: PropTypes.array,
  updateEvents: PropTypes.func,
  updateVenues: PropTypes.func,
  venues: PropTypes.array
};

/*
  DeletionModal
  <DeletionModal/>
*/

class DeletionModal extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
    this.handleNoClick = () => this.handleClick(false);
    this.handleYesClick = () => this.handleClick(true);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      destroy: false,
      isLoading: false,
      successMessage: 'Venue successfully destroyed.',
      venue: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const venue = nextProps.venues.find((nextVenue) => {
      return nextVenue._id === nextProps.router.params.id;
    }) || {};

    return this.setState({ venue });
  }

  closeModal() {
    return this.props.router.push('/admin/venues/all');
  }

  destroyVenue() {
    return adminVenuesService
      .destroyVenue(this.state.venue._id)
      .then(this.closeModal)
      .then(this.props.updateVenues)
      .then(() => {
        return this.props.setAlertMessage({ successMessage: this.state.successMessage });
      });
  }

  handleClick(bool) {
    return this.setState({ destroy: bool });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.destroy) {
      return this.setState({ isLoading: true }, this.destroyVenue);
    }

    return this.closeModal();
  }

  render() {
    return (
      <Modal
        closeModal={this.closeModal}
        handleSubmit={this.handleSubmit}
        heading={`Delete ${this.state.venue.name}?`}
        isLoading={this.state.isLoading}
      >
        <div className="c-card__body">
          <RadioButton
            explanationText="Yes"
            id="destroyFalseButton"
            inputProps={{
              checked: this.state.destroy,
              onClick: this.handleYesClick
            }}
          />

          <RadioButton
            explanationText="No"
            id="destroyTrueButton"
            inputProps={{
              checked: !this.state.destroy,
              onClick: this.handleNoClick
            }}
          />
        </div>
      </Modal>
    );
  }
}

DeletionModal.propTypes = propTypes;

export default DeletionModal;
