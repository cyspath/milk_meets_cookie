import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import * as actions from '../../actions/chat_actions';

class ChatBox extends Component {
  constructor() {
    super();
    this.state = { message: '', enterToSend: true };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  handleTextChange(e) {
    this.setState({ message: e.target.value });
  }

  handleEnterToSendToggle(e) {
    this.setState({ enterToSend: !this.state.enterToSend });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.message.trim() !== '') {
      const data = { sender_id: this.props.currentUser.id, receiver_id: this.props.targetUser.id, message: this.state.message };
      this.props.sendMessage(data);
    }
    this.setState({ message: '' });
  }

  handleComponentClick(e) { // clicking on chat box will mark newly received messages from targetUser to read
    e.preventDefault();
    const unreadMessages = this.props.messages.filter((m) => {
      if (m.receiver_id === this.props.currentUser.id && !m.read) {
        return m;
      }
    })
    if (unreadMessages.length > 0) {
      this.props.updateMessagesToRead(unreadMessages);
    }
  }

  renderMessages() {
    return this.props.messages.map((m) => {
      if (m.sender_id === this.props.currentUser.id) {
        return (
          <div key={m.id} className="message yours">
            <span>{m.message}</span>
          </div>
        )
      } else if (m.sender_id === this.props.targetUser.id) {
        return (
          <div key={m.id} className="message theirs">
            <span>{m.message}</span>
          </div>
        )
      } else {
        return <div>Bad data</div>
      }
    });
  }

  renderInput() {
    if (this.state.enterToSend) {
      return <input id='message-box' className="message-box" placeholder="Enter your message" value={this.state.message} onChange={this.handleTextChange.bind(this)} />
    } else {
      return <textarea id='message-box' className="message-box" placeholder="Compose your message" value={this.state.message} onChange={this.handleTextChange.bind(this)} />
    }
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`} onClick={this.handleComponentClick.bind(this)}>
        <div className="header">
          <Link to={"user/" + this.props.targetUser.id}>
            <span className="header-avatar">
              <img src={this.props.targetUser.avatar_url} alt=""/>
            </span>
            <span className="header-username">{this.props.targetUser.username}</span>
          </Link>
          <i className="fa fa-times" onClick={() => this.props.closeChat()}></i>
        </div>
        <div className="messages">
          <div className="messages-list">
            {this.renderMessages()}
            <div style={ {float:"left", clear: "both"} } ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
        </div>
        <div className="compose-message">
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <div>{this.renderInput()}</div>

            {!this.state.enterToSend && <button className="btn btn-primary" onClick={this.handleFormSubmit.bind(this)}>Send</button>}

            <div className="enter-to-send" onClick={this.handleEnterToSendToggle.bind(this)}>
              <span>Press enter to send  </span>
              <i className={`fa ${this.state.enterToSend ? 'fa-check-square-o' : 'fa-square-o'}`}></i>
            </div>

          </form>
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

export default connect(mapStateToProps, actions)(ChatBox);
