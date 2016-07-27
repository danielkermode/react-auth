import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/session';

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
    this.props.login(this.state.username, this.state.password);
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

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    }
  };
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;