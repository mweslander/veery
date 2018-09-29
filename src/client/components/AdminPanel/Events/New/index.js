// Imports
import React, {
  Component
} from 'react';
import moment from 'moment';

// Components
import EventForm from '../../../Base/EventForm';
import Button from '../../../Base/Button';

// CSS
import './index.scss';

// Services
import adminEventsService from '../../../../services/admin/events';

// Utils
import mapFormValues from '../../../../utils/mapFormValues';

// PropTypes
import propTypes from '../../../../constants/propTypes/adminPanel/baseVenues';

/*
  NewEvent
  <NewEvent/>
*/

class NewEvent extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.setForm = (form) => this.newEventForm = form;
    this.state = {
      startDate: moment().add(1, 'day')
    };
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

