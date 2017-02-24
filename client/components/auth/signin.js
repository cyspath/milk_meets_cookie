import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth_actions';

class Signin extends Component {

  componentWillMount() {
    if (this.props.authenticated) { // if already authenicated, redirect to root
      browserHistory.push('/');
    }
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
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div className={`${this.constructor.name}-component auth-form`}>
        <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))} className="form-validation">

          <div className="form-title-row"><h1>Sign in to see who's in your area</h1></div>

          <div className="form-row">
            <label><span>Email</span></label>
            <Field name="email" type="email" component={renderInputField}/>
          </div>

          <div className="form-row">
            <label><span>Password</span></label>
            <Field name="password" type="password" component={renderInputField}/>
          </div>

          {this.renderAlert()}

          <div className="form-row">
            <button type="submit" className="btn btn-primary">Continue</button>
          </div>

          <div className="form-row">
            <div className="form-footer">
              <span>Not a member?</span><Link to="/welcome"> Start here »</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const renderInputField = ({ input, label, type }) => (
  <div className="form-input-container">
    <div>
      <input {...input} placeholder={label} type={type}/>
    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  };
}

const form = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
});

export default connect(mapStateToProps, actions)(form(Signin));
