import 'react-dates/initialize';
import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// CSS
import './index.scss';

// IE 11 bug fix. This is specifically to deal with
// `SingleDatePicker` using `Array.from`.
if (!Array.from) { Array.from = require('array-from'); }

const propTypes = {
  defaultDate: PropTypes.string
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(props.defaultDate),
      focused: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDate !== nextProps.defaultDate) {
      this.setState({ date: moment(nextProps.defaultDate) });
    }
  }

  render() {
    return (
      <div>
        <SingleDatePicker
          enableOutsideDays={true} // eslint-disable-line
          date={this.state.date}
          focused={this.state.focused}
          isOutsideRange={() => false}
          onDateChange={date => this.setState({ date })}
          onFocusChange={({ focused }) => this.setState({ focused })}
          orientation="vertical"
        />
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;

export default DatePicker;
