// Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

// Components
import Button from '../../../Base/Button';

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

    return (
      <div>
        <div className="c-overlay c-overlay--visible" />
        <div className="o-modal">
          <form
            className="new-event o-fieldset o-container o-container--small"
            ref={(form) => { this.deleteEventsForm = form; }}
            onSubmit={this.handleSubmit}
          >
            <div className="c-card">
              <header className="c-card__header">
                <button className="c-button--close" onClick={this.closeModal}>&times;</button>
                <h2 className="c-heading">Delete Recurring Event</h2>
              </header>

              <div className="c-card__body">
                <div className="c-deletion-modal__radio-container">
                  <label className="c-label" htmlFor="destroyAllFalse">
                    <input
                      type="radio"
                      name="destroyAll"
                      id="destroyAllFalse"
                      onClick={() => this.handleClick(false)}
                    />
                    <span className="c-deletion-modal__radio-explanation">This event</span>
                  </label>
                </div>

                <div className="c-deletion-modal__radio-container">
                  <label className="c-label" htmlFor="destroyAllTrue">
                    <input
                      type="radio"
                      name="destroyAll"
                      id="destroyAllTrue"
                      onClick={() => this.handleClick(true)}
                    />
                    <span className="c-deletion-modal__radio-explanation">This and all recurring {event.frequency} events for {event.title}</span>
                  </label>
                </div>
              </div>

              <footer className="c-card__footer">
                <Button value="Submit" />
              </footer>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

DeletionModal.propTypes = propTypes;

export default DeletionModal;
