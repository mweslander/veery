// Imports
import React, {
  Component
} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import EventForm from '../../../Base/EventForm';
import Button from '../../../Base/Button';

// CSS
import './index.scss';

// Services
import adminEventsService from '../../../../services/admin/events';

// Utils
import mapFormValues from '../../../../utils/mapFormValues';

const propTypes = {
  handleSuccessfulCreation: PropTypes.func,
  venues: PropTypes.array
};

/*
  NewEvent
  <NewEvent/>
*/

class NewEvent extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.setForm = this.setForm.bind(this);
    this.state = {
      startDate: moment().add(1, 'day')
    };
  }

  setForm(form) {
    this.newEventForm = form;
  }

  handleStartDateChange(startDate) {
    return this.setState({ startDate });
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = mapFormValues(this.newEventForm.elements);
    values.startDate = moment(this.state.startDate).format('MM-DD-YY');

    return adminEventsService
      .createEvent(values)
      .then(() => {
        return this.props.handleSuccessfulCreation('Event', '/admin/events');
      });
  }

  render() {
    return (
      <form
        className="c-new-event o-container o-container--small"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
      >
        <EventForm
          event={this}
          handleStartDateChange={this.handleStartDateChange}
          venues={this.props.venues}
        />

        <Button value="Create Event" />
      </form>
    );
  }
}

NewEvent.propTypes = propTypes;

export default NewEvent;

