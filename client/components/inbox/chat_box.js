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
        <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))}>
            <div>
              <Field name="message" component="textarea"/>
            </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

const form = reduxForm({
  form: 'chatBox',
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true
});

export default connect(mapStateToProps, actions)(form(ChatBox));
