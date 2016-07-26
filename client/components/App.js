import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
class App extends Component {
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
        <ul>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        {this.props.children || <p>Hello.</p>}
      </div>
    );
  }
}

export default App;
