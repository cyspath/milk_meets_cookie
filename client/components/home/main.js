import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/home_actions';

class Home extends Component {
  // componentWillMount() {
  //   this.props.fetchMessage();
  // }
  //
  // render() {
  //   return (
  //     <div>{this.props.message}</div>
  //   )
  // }
  render() {
    return (
      <div>this is  home page</div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Home);
