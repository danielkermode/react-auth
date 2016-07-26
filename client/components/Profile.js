import React, { Component, PropTypes } from 'react';

class Profile extends Component {
  static propTypes = {
    //propTypes go here
  };

  constructor(props) {
    super(props);
    this.state = {
      //state goes here
      username: ''
    };
  }

  componentDidMount() {
    const options = {
      credentials: 'same-origin'
    };
    fetch('/user/' + this.props.params.id, options)
      .then(res => {
        const result = res.status === 403 ? 'Forbidden' : res.json();
        return result;
      })
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
      Hi, {this.state.username}!
      </div>
    );
  }
}

export default Profile;