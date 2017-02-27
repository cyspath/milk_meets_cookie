import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/home_actions';

class Home extends Component {
  componentWillMount() {
    this.props.fetchUsers({a:1});
  }
  //
  // render() {
  //   return (
  //     <div>{this.props.message}</div>
  //   )
  // }
  render() {
    console.log(this.props.currentUser);
    return (
      <div>this is  home page</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser
  };
}

export default connect(mapStateToProps, actions)(Home);
