import React, { Component } from 'react';
import Navbar from './layout/navbar/navbar';
import { connect } from 'react-redux';
import * as actions from '../actions/user_actions';

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
        <div className="main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Root);
