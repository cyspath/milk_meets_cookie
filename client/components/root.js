import React, { Component } from 'react';
import Navbar from './nav/navbar';
import { connect } from 'react-redux';
import * as actions from '../actions/auth_actions';

class Root extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getCurrentUser();
    }
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <Navbar {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    // currentUser: state.auth.currentUser
  };
}
export default connect(null, actions)(Root);
