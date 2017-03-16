import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/chat_actions';

class ChatBox extends Component {
  constructor() {
    super();
  }
  // //
  // // componentDidMount(){
  // //  this._handleMessageEvent()
  // // }
  // //
  // _handleMessageEvent(){
  //   deubb
  //   this.props.socket.on('chat message', (data) => {
  //     debugger
  //     this.setState({ messages: this.state.messages.concat([data]) })
  //   })
  // }

  handleFormSubmit(formProps) {
    debugger
    const data = { sender: this.props.currentUser, receiver: this.props.targetUser, message: formProps.message };
    this.props.sendMessage(data);
  }

  renderMessages() {
    return this.props.messages.map((m) => {
      return (
        <div>
          <span>{m.sender.username}: </span>
          <span>{m.message}</span>
        </div>
      )
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="header">
          <span className="header-avatar">
            <img src={this.props.targetUser.avatar_url} alt=""/>
          </span>
          <span className="header-username">{this.props.targetUser.username}</span>
        </div>
        <div className="messages">
          {this.renderMessages()}
        </div>
        <div className="compose-message">
          <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))}>
              <div>
                <Field name="message" component="textarea" placeholder="Compose your message"/>
              </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.usersReducer.currentUser,
    targetUser: state.chatReducer.targetUser,
    messages: state.chatReducer.messages
  };
}

const form = reduxForm({ form: 'chatBox' });

export default connect(mapStateToProps, actions)(form(ChatBox));
