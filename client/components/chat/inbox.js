import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import moment from 'moment';
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
    console.log(this.props.inbox);
    if (this.props.inbox.length > 0) {
      return this.props.inbox.map((user) => {
        var date = moment(user.created_at).format("MMM DD, YYYY");
        console.log(user);
        return (
          <div key={user.targetUser.id} className="inbox-item-container">
            <div className="header-avatar col-sm-2 inner-1">
              <img src={user.targetUser.avatar_url} alt=""/>
            </div>
            <div className="col-sm-6 inner-2">
              <div className="inbox-username">{user.targetUser.username}</div>
              <div className="inbox-message">{user.message}</div>
            </div>
            <div className="col-sm-4 inner-3">{date}</div>
          </div>
        )
      })
    } else {
      return (
        <div>No Messages</div>
      )
    }
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
    inbox: state.chatReducer.inbox
  };
}

export default connect(mapStateToProps, actions)(Inbox);
