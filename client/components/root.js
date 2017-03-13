import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/user_actions';
import Navbar from './layout/navbar/navbar';
import ChatBox from './chat/chat_box';

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
        <ChatBox />
      </div>
    );
  }
}

export default connect(null, actions)(Root);
