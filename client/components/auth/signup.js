import React, { Component } from 'react';
import { Link } from 'react-router';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actions from '../../actions/auth_actions';
import moment from 'moment';
import ProvinceCity from '../../services/province_city/province_city';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: ProvinceCity.query().map((p) => { return { value: p, label: p } }),
      province: undefined,
      cities: [],
      city: undefined
    };
  }

  componentWillMount() {
    this.props.clearAuthError(); // first clear auth errors from clicking submit
  }

  handleFormSubmit(formProps) {
    const params = Object.assign(formProps, this.props.searchCriteria);
    params.dob = new Date(`${params.month}/${params.day}/${params.year}`)
    this.props.signupUser(params);
  }

  handleProvinceChange(option) {
    console.log("Selected province: " + option.value);
    this.setState({
      province: option.value,
      cities: ProvinceCity.query(option.value).map((p) => { return { value: p, label: p } }),
      city: undefined
    })
  }

  handleCityChange(option) {
    console.log("Selected city: " + option.value);
    this.setState({ city: option.value })
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
      <div className="auth-form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-validation">
          <div className="form-title-row"><h1>Register now to see who's in your area</h1></div>

          <div className="form-row">
            <label><span>Birthdate</span></label>
            <div className="form-input-container form-input-date">
              <Field name="month" placeholder="MM" className="dob-input dob-input__month" component={renderDateField}/>
              <Field name="day" placeholder="DD" className="dob-input dob-input__day" component={renderDateField}/>
              <Field name="year" placeholder="YYYY" className="dob-input dob-input__year" component={renderDateField}/>
            </div>
          </div>

          <div className="form-row">
            <label><span>Location</span></label>
            <div className="form-input-container form-input-location inline-list">
              <Field
                name="province"
                placeholder="Province"
                onChange={this.handleProvinceChange.bind(this)}
                component={renderDropdownList}
                data={this.state.provinces}
                valueField="value"
                textField="label"/>
              <Field
                name="city"
                placeholder="City"
                onChange={this.handleCityChange.bind(this)}
                component={renderDropdownList}
                data={this.state.cities}
                valueField="value"
                textField="label"/>
            </div>
          </div>

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

const renderInputField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-input-container">
    <div className={touched && error ? "form-invalid-data" : ""}>
      <input {...input} placeholder={label} type={type}/>
      <span className="form-invalid-data-info">{error}</span>
    </div>
  </div>
)

const renderDateField = ({ input, placeholder, className, meta: { touched, error, warning } }) => (
  <div className={`inline-block ${touched && error ? "form-invalid-data" : ""}`}>
    <input {...input} placeholder={placeholder} className={className}/>
    <span className="form-invalid-date-info">{error}</span>
  </div>
)

const renderDropdownList = ({ input, meta: { touched, error, warning }, ...rest }) => (
  <div className="inline-block">
    <DropdownList {...input} {...rest} />
  </div>
)


const validate = values => {
  const errors = {}
  // location
  if (!values.province) {
    errors.province = 'where are you?'
  }
  if (!values.city) {
    errors.city = 'where are you?'
  }

  // email
  if (!values.email) {
    errors.email = 'Please enter an email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // password
  if (!values.password) {
    errors.password = 'Please enter a password'
  }
  // birthdate
  let dateString = `${values.month}/${values.day}/${values.year}`
  if (!values.month) {
    errors.month = 'Please enter a month'
  } else if (isNaN(Number(values.month)) || Number(values.month) < 1 || Number(values.month) > 12) {
    errors.month = 'Must be a valid month number'
  }
  if (!values.day) {
    errors.day = 'Please enter a day'
  } else if (isNaN(Number(values.day)) || Number(values.day) < 1 || Number(values.day) > 31) {
    errors.day = 'Must be a valid day number'
  }
  if (!values.year) {
    errors.year = 'Please enter a year'
  } else if (isNaN(Number(values.year)) || Number(values.year) < 1910 || Number(values.year) > 2100) {
    errors.year = 'Must be a valid year number'
  } else if (values.year >  moment().year() - 18) {
    errors.year = 'Must be at least 18'
  } else if (!moment(dateString, "MM/DD/YYYY", true).isValid()) {
    errors.year = 'Must be a valid birthdate (this date does not exist)'
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated  };
}

const form = reduxForm({
  form: 'signup',
  validate: validate
});

export default connect(mapStateToProps, actions)(form(Signup));
