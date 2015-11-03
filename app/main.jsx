import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class HelloVeery extends Component {
  render() {
    return <div>Hello Veery</div>;
  }
}

ReactDOM.render(<HelloVeery />, document.querySelector('#react-mount'));
