// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Modal from '../../../Base/Modal';
import RadioButton from '../../../Base/RadioButton';

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
    this.handleDestroyAll = () => this.handleChange(true);
    this.handleDestroyOne = () => this.handleChange(false);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      destroyAll: false,
      event: {},
      isLoading: false,
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

  destroyEvent() {
    return adminEventsService
      .destroyEvent(this.state.event._id, { destroyAll: this.state.destroyAll })
      .then(this.props.handleUpdate)
      .then(this.closeModal)
      .then(() => {
        return this.props.setAlertMessage({ successMessage: this.state.successMessage });
      });
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
    return this.setState({ isLoading: true }, this.destroyEvent);
  }

  render() {
    const event = this.state.event;
    const oneTime = event.frequency === 'one time';

    return (
      <Modal
        closeModal={this.closeModal}
        handleSubmit={this.handleSubmit}
        heading={oneTime ? 'Delete?' : 'Delete Recurring Events'}
        isLoading={this.state.isLoading}
      >
        <div className="c-card__body">
          <RadioButton
            explanationText="This event"
            id="destroyAllFalseButton"
            inputProps={{
              checked: !this.state.destroyAll,
              onChange: this.handleDestroyOne
            }}
          />

          {!oneTime &&
            <RadioButton
              explanationText={`This and all ${event.title} events`}
              id="destroyAllTrueButton"
              inputProps={{
                checked: this.state.destroyAll,
                onChange: this.handleDestroyAll
              }}
            />}
        </div>
      </Modal>
    );
  }
}

DeletionModal.propTypes = propTypes;

export default DeletionModal;
