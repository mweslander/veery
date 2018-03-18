import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import AntdTimePicker from 'antd/es/time-picker';

const propTypes = {
  defaultTime: PropTypes.string
};

function TimePicker({ defaultTime }) {
  return (
    <div>
      <AntdTimePicker
        defaultValue={moment(defaultTime)}
        format="h:mm a"
        name="startTime"
        use12Hours
      />
    </div>
  );
}

TimePicker.propTypes = propTypes;

export default TimePicker;
