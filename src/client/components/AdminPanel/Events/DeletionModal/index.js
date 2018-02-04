// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from '../../../Base/Modal';

// Services
import adminEventsService from '../../../../services/admin/events';

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
      destroyAll: false,
      event: {},
      successMessage: 'Event successfully destroyed.'
    };
  }

  componentWillReceiveProps(nextProps) {
    const event = nextProps.events.find((nextEvent) => {
      return nextEvent._id === nextProps.router.params.id;
    }) || {};

    return this.setState({ event });
  }

  closeModal() {
    return this.props.router.push('/admin/events/all');
  }

  handleClick(bool) {
    const successMessage = `Event${bool ? 's' : ''} successfully destroyed.`;

    return this.setState({
      successMessage,
      destroyAll: bool
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    return adminEventsService
      .destroyEvent(this.state.event._id, { destroyAll: this.state.destroyAll })
      .then(this.closeModal)
      .then(this.props.updateEvents)
      .then(() => {
        return this.props.setAlertMessage({ successMessage: this.state.successMessage });
      });
  }

  render() {
    const event = this.state.event;
    const oneTime = event.frequency === 'one time';

    return (
      <Modal
        closeModal={this.closeModal}
        handleSubmit={this.handleSubmit}
        heading={oneTime ? 'Delete?' : 'Delete Recurring Events'}
      >
        <div className="c-card__body">
          <div className="c-modal__radio-container">
            <label className="c-label" htmlFor="destroyAllFalseButton">
              <input
                type="radio"
                id="destroyAllFalseButton"
                onClick={() => this.handleClick(false)}
              />

              <span className="c-modal__radio-explanation">This event</span>
            </label>
          </div>

          {!oneTime &&
            <div className="c-modal__radio-container">
              <label className="c-label" htmlFor="destroyAllTrueButton">
                <input
                  type="radio"
                  id="destroyAllTrueButton"
                  onClick={() => this.handleClick(true)}
                />

                <span className="c-modal__radio-explanation">This and following {event.title} events</span>
              </label>
            </div>}
        </div>
      </Modal>
    );
  }
}

DeletionModal.propTypes = propTypes;

export default DeletionModal;
