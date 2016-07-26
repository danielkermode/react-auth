import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
  static propTypes = {
    //propTypes go here
  };

  constructor(props) {
    super(props);
    this.state = {
      //state goes here
      username: '',
      password: ''
    };
  }

  userChange = (e) => {
    this.setState({ username: e.target.value });
  };

  pwChange = (e) => {
    this.setState({ password: e.target.value });
  };

  login = () => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state),
      credentials: 'same-origin'
    };

    fetch('/login', options)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        browserHistory.push('/profile/' + res.id);
      });
  };

  render() {
    return (
      <div>
        <label>Username</label>
        <div>
          <input onChange={this.userChange} className="form-control" type="text" placeholder="Username" />
        </div>
        <label>Password</label>
        <div>
          <input onChange={this.pwChange} className="form-control" type="password" placeholder="Password" />
        </div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login;