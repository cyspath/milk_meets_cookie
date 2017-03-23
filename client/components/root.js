import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import * as userActions from '../actions/user_actions';
import * as chatActions from '../actions/chat_actions';
import Navbar from './layout/navbar/navbar';
import ChatBox from './chat/chat_box';
import socket from '../socketio_client';

class Root extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getCurrentUser(socket);
      // require_auth will update state.auth.currentUser
      //  Root will inherit props from require_auth
    }
  }

  renderChatBox() {
    if (!_.isEmpty(this.props.chatTargetUser)) {
      return(<ChatBox currentUser={this.props.currentUser} targetUser={this.props.chatTargetUser}/>)
    }
  }

  render() {
    let chatBox = this.renderChatBox();
    return (
      <div className={`${this.constructor.name}-component`}>
        <Navbar {...this.props} />
        <div className="main-content">
          {this.props.children}
        </div>
        {chatBox}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chatTargetUser: state.chatReducer.targetUser,
  };
}

const actions = Object.assign(userActions, chatActions);
export default connect(mapStateToProps, actions)(Root);
