import React, { Component } from 'react';
import Navbar from './layout/navbar/navbar';
import { connect } from 'react-redux';
import * as actions from '../actions/auth_actions';

class Root extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getCurrentUser();
      // require_auth will update state.auth.currentUser
      //  Root will inherit props from require_auth
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

export default connect(null, actions)(Root);
