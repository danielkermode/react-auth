import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class Register extends Component {
  static propTypes = {
    //propTypes go here
  };

  constructor(props) {
    super(props);
    this.state = {
      //state goes here
      username: '',
      password: '',
      cPassword: ''
    };
  }

  userChange = (e) => {
    this.setState({ username: e.target.value });
  };

  pwChange = (e) => {
    this.setState({ password: e.target.value });
  };

  cpwChange = (e) => {
    this.setState({ cPassword: e.target.value });
  };

  register = () => {
    let body = {};
    if(this.state.password === this.state.cPassword) {
      body.username = this.state.username;
      body.password = this.state.password;
    }

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    };

    fetch('/user', options)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
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
        <label>Confirm Password</label>
        <div>
          <input onChange={this.cpwChange} className="form-control" type="password" placeholder="Confirm Password" />
        </div>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default Register;