import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/session';

class Profile extends Component {
  static propTypes = {
    //propTypes go here
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser(this.props.params.id);
  }

  render() {
    //const username = this.props.session.user.username ? this.props.session.user.username : '';
    return (
      <div>
      Hi
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
    getUser: (id) => {
      dispatch(getUser(id));
    }
  };
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;