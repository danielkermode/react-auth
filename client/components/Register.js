import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { register } from '../redux/session';

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
    if(this.state.password === this.state.cPassword) {
      this.props.register(this.state.username, this.state.password);
    }
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

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    register: (username, password) => {
      dispatch(register(username, password));
    }
  };
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;