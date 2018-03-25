// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from '../../../Base/Modal';

// Services
import adminVenuesService from '../../../../services/admin/venues';

// PropTypes
const propTypes = {
  events: PropTypes.array,
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
  venues: PropTypes.array,
  updateEvents: PropTypes.func,
  updateVenues: PropTypes.func
};

/*
  DeletionModal
  <DeletionModal/>
*/

class DeletionModal extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
          <div className="c-modal__radio-container">
            <label className="c-label" htmlFor="destroyFalseButton">
              <input
                checked={this.state.destroy}
                type="radio"
                id="destroyFalseButton"
                onClick={() => this.handleClick(true)}
              />

              <span className="c-modal__radio-explanation">Yes</span>
            </label>
          </div>

          <div className="c-modal__radio-container">
            <label className="c-label" htmlFor="destroyTrueButton">
              <input
                checked={!this.state.destroy}
                type="radio"
                id="destroyTrueButton"
                onClick={() => this.handleClick(false)}
              />

              <span className="c-modal__radio-explanation">No</span>
            </label>
          </div>
        </div>
      </Modal>
    );
  }
}

DeletionModal.propTypes = propTypes;

export default DeletionModal;
