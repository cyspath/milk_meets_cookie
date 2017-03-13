import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/chat_actions';

class ChatBox extends Component {
  constructor() {
    super();
  }

  handleFormSubmit(formProps) {
    this.props.fetchUsers(formProps);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="header">
          <div className="header-avatar">
            <img src={this.props.targetUser.avatar_url} alt=""/>
          </div>
        </div>
        <div className="messages">

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
    targetUser: state.chatReducer.targetUser,
    messages: state.chatReducer.messages
  };
}

const form = reduxForm({
  form: 'chatBox',
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true
});

export default connect(mapStateToProps, actions)(form(ChatBox));
