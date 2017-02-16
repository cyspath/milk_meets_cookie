import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth_actions';

class Signin extends Component {

  componentWillMount() {
    this.props.clearAuthError(); // first clear auth errors from clicking submit
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage && !this.props.authenticated) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      <div className="auth-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-validation">

          <div className="form-title-row"><h1>Sign in to see who's in your area</h1></div>

          <div className="form-row form-input-email-row">
            <label>
              <span>Email</span>
              <input {...email} />
            </label>
          </div>

          <div className="form-row form-input-email-row">
            <label>
              <span>Password</span>
              <input {...password} type="password"/>
            </label>
          </div>

          {this.renderAlert()}

          <div className="form-row">
            <button action="submit">Continue</button>
          </div>

          <div className="form-row">
            <div className="form-footer">
              <span>Not a member?</span><Link to="/signup"> Sign up here »</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
