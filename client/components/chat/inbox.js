import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
// import { Link } from 'react-router'
import * as actions from '../../actions/chat_actions';

class Inbox extends Component {
  // constructor() {
  //   super();
  //   this.state = { show: false };
  // }

  componentDidMount() {
    this.props.fetchInbox();
  }
  //
  // handleComponentClick(e) { // clicking on chat box will mark newly received messages from targetUser to read
  //   e.preventDefault();
  //   const unreadMessages = this.props.messages.filter((m) => {
  //     if (m.receiver_id === this.props.currentUser.id && !m.read) {
  //       return m;
  //     }
  //   })
  //   if (unreadMessages.length > 0) {
  //     this.props.updateMessagesToRead(unreadMessages);
  //   }
  // }
  renderUsers() {

  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="header">Inbox</div>
        <div className="users-list">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chatReducer.messages
  };
}

export default connect(mapStateToProps, actions)(Inbox);
