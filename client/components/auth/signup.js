import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth_actions';
import moment from 'moment';
import ProvinceCitySelect from './province_city_select';

class Signup extends Component {

  componentWillMount() {
    this.props.clearAuthError(); // first clear auth errors from clicking submit
  }

  handleFormSubmit(formProps) {
    const params = Object.assign(formProps, this.props.searchCriteria);
    params.dob = new Date(`${params.month}/${params.day}/${params.year}`)
    this.props.signupUser(params);
  }

  handleClassName(condition) {
    return condition ? "form-row form-input-email-row form-invalid-data" : "form-row form-input-email-row";
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
    const { handleSubmit, fields: { month, day, year, email, password, passwordConfirm }} = this.props;
    const dobError = (month.touched && month.error) || (day.touched && day.error) || (year.touched && year.error)

    return (
      <div className="auth-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-validation">

          <div className="form-title-row"><h1>Register now to see who's in your area</h1></div>

          <div className={this.handleClassName(dobError)}>
            <label>
              <span>Birthdate</span>
              <input {...month} placeholder="MM" className="dob-input dob-input__month"/>
              <input {...day}  placeholder="DD" className="dob-input dob-input__day"/>
              <input {...year} placeholder="YYYY" className="dob-input dob-input__year"/>
            </label>
            <span className="form-invalid-data-info">{month.error || day.error || year.error}</span>
          </div>

          <div className={this.handleClassName(location.touched)}>
            <label>
              <span>Location</span>
            </label>
            <ProvinceCitySelect {...location}/>
            <span className="form-invalid-data-info">"{location.error}"</span>
          </div>

          <div className={this.handleClassName(email.touched && email.error)}>
            <label>
              <span>Email</span>
              <input {...email} />
            </label>
            <span className="form-invalid-data-info">{email.error}</span>
          </div>

          <div className={this.handleClassName(password.touched && password.error)}>
            <label>
              <span>Password</span>
              <input {...password} type="password"/>
            </label>
            <span className="form-invalid-data-info">{password.error}</span>
          </div>

          <div className={this.handleClassName(passwordConfirm.touched && passwordConfirm.error)}>
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
  ['month', 'day', 'year', 'email', 'password', 'passwordConfirm'].forEach((field) => {
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
  if (!validateDob(formProps)) {
    errors['year'] = 'Birthdate is invalid';
  }
  return errors;
}

function validateDob(formProps) {
  const str = `${formProps.month}/${formProps.day}/${formProps.year}`
  return moment(str, "MM/DD/YYYY", true).isValid() && formProps.year <  moment().year() - 13
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated  };
}

export default reduxForm({
  form: 'signup',
  fields: ['month', 'day', 'year', 'location', 'email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);
