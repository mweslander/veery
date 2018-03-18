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
  handleUpdate: PropTypes.func,
  removeAlert: PropTypes.func,
  router: PropTypes.shape({
    goBack: PropTypes.func,
    params: PropTypes.shape({
      eventId: PropTypes.string,
      id: PropTypes.string
    }),
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func
};

/*
  DeletionModal
  <DeletionModal/>
*/

class DeletionModal extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      destroyAll: false,
      event: {},
      successMessage: 'Event successfully destroyed.'
    };
  }

  componentWillReceiveProps(nextProps) {
    const event = nextProps.events.find((nextEvent) => {
      const eventId = nextProps.router.params.eventId;
      const id = nextProps.router.params.id;

      return nextEvent._id === eventId || nextEvent._id === id;
    }) || {};

    return this.setState({ event });
  }

  closeModal() {
    return this.props.router.goBack();
  }

  handleChange(bool) {
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
      .then(this.props.handleUpdate)
      .then(this.closeModal)
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
                checked={!this.state.destroyAll}
                type="radio"
                id="destroyAllFalseButton"
                onChange={() => this.handleChange(false)}
              />

              <span className="c-modal__radio-explanation">This event</span>
            </label>
          </div>

          {!oneTime &&
            <div className="c-modal__radio-container">
              <label className="c-label" htmlFor="destroyAllTrueButton">
                <input
                  checked={this.state.destroyAll}
                  type="radio"
                  id="destroyAllTrueButton"
                  onChange={() => this.handleChange(true)}
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
