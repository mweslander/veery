import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AntdDatePicker from 'antd/es/date-picker';

// CSS
import './index.scss';

// IE 11 bug fix. This is specifically to deal with
// `SingleDatePicker` using `Array.from`.
if (!Array.from) { Array.from = require('array-from'); }

const propTypes = {
  defaultDate: PropTypes.string,
  handleStartDateChange: PropTypes.func
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(props.defaultDate).add(1, 'day')
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
        <AntdDatePicker
          name="startDate"
          onChange={this.props.handleStartDateChange}
          format="MM-DD-YY"
          defaultValue={moment(this.state.date)}
        />
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;

export default DatePicker;
