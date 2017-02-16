import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth_actions';

class Signup extends Component {

  componentWillMount() {
    this.props.clearAuthError(); // first clear auth errors from clicking submit
  }

  handleFormSubmit(formProps) {
    const params = Object.assign(formProps, this.props.searchCriteria);
    console.log(params);
    this.props.signupUser(params);
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
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
    return (
      <div className="auth-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-validation">

          <div className="form-title-row"><h1>Register now to see who's in your area</h1></div>

          <div className={email.touched && email.error ? "form-row form-input-email-row form-invalid-data" : "form-row form-input-email-row"}>
            <label>
              <span>Email</span>
              <input {...email} />
            </label>
            <span className="form-invalid-data-info">{email.error}</span>
          </div>

          <div className={password.touched && password.error ? "form-row form-input-email-row form-invalid-data" : "form-row form-input-email-row"}>
            <label>
              <span>Password</span>
              <input {...password} type="password"/>
            </label>
            <span className="form-invalid-data-info">{password.error}</span>
          </div>

          <div className={passwordConfirm.touched && passwordConfirm.error ? "form-row form-input-email-row form-invalid-data" : "form-row form-input-email-row"}>
            <label>
              <span>Confirm Password</span>
              <input {...passwordConfirm} type="password"/>
            </label>
            <span className="form-invalid-data-info">{passwordConfirm.error}</span>
          </div>

          {this.renderAlert()}

          <div className="form-row">
            <button action="submit">Sign Up!</button>
          </div>

          <div className="form-row">
            <div className="form-footer">
              <span>Already a member?</span><Link to="/signin"> Sign in here »</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = {};
  ['email', 'password', 'passwordConfirm'].forEach((field) => {
    if (!formProps[field]) {
      let fieldName = field === 'passwordConfirm' ? 'password confirmation' : field;
      errors[field] = `Please enter an ${fieldName}`;
    } else if (field === 'email' && emailRegex.test(formProps[field]) === false) {
      errors[field] = `Email format is invalid`;
    }
  });
  if (formProps.passwordConfirm && formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated  };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);
