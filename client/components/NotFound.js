import React, { Component, PropTypes } from 'react';

class NotFound extends Component {
  static propTypes = {
    //propTypes go here
  };

  constructor(props) {
    super(props);
    this.state = {
      //state goes here
    };
  }

  render() {
    return (
      <div>
        Page not found.
      </div>
    );
  }
}

export default NotFound;