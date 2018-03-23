// Imports
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
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
const propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  setAlertMessage: PropTypes.func,
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
        this.props.setAlertMessage({ successMessage: 'Event successfully created.' });
        return this.props.router.push('/admin/events');
      });
  }

  render() {
    return (
      <form
        className="c-new-event o-fieldset o-container o-container--small"
        ref={(form) => { this.newEventForm = form; }}
        onSubmit={this.handleSubmit}
      >
        <EventForm
          event={{}}
          form={this.newEventForm}
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

