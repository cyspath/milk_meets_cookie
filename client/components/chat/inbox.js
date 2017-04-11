import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../actions/chat_actions';

class Inbox extends Component {
  constructor() {
    super();
    this.closeInbox = () => { this.props.toggleInbox(false) };
  }
  componentDidMount() {
    this.props.fetchInbox();
    document.addEventListener('click', this.closeInbox, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeInbox, false);
  }

  handleToggleChat(targetUser) {
    this.props.openChat(this.props.currentUser, targetUser);
  }

  renderUsers() {
    if (this.props.inbox.length > 0) {
      return this.props.inbox.map((user) => {
        var date = moment(user.created_at).format("MMM DD, YYYY");
        return (
          <div key={user.targetUser.id} className="inbox-item-container" onClick={this.handleToggleChat.bind(this, user.targetUser)}>
            <div className="header-avatar col-sm-2 inner-1">
              <img src={user.targetUser.avatar_url} alt=""/>
            </div>
            <div className="col-sm-6 inner-2">
              <div className="inbox-username">{user.targetUser.username}</div>
              <div className="inbox-message">{user.message}</div>
            </div>
            <div className="col-sm-4 inner-3">{date}</div>
            {user.unreadCount > 0 && <div className="unread-count">{user.unreadCount}</div>}
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
