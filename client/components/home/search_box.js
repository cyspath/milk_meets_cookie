import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actions from '../../actions/home_actions';

class SearchBox extends Component {
  constructor() {
    super();
    this.sexOptions =  [{ label: 'Woman', value: 'female' }, { label: 'Man', value: 'male' }];
    this.ageOptions = this.generateAgeOptions();
  }

  generateAgeOptions() {
    const options = [];
    for (var i = 18; i <= 99; i++) {
      options.push(i)
    }
    return options;
  }

  handleFormSubmit(formProps) {
    debugger
    // this.props.fetchUsers(formProps);
  }

  handleChange(option) {

  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.constructor.name}-component`}>
        <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))} className="">

          <div>
            <Field
              name="sex"
              component={renderDropdownList}
              data={this.sexOptions}
              valueField="value"
              textField="label"/>
          </div>

          <div>
            <Field
              name="age_low"
              type="number"
              component={renderDropdownList}
              data={this.ageOptions}
              valueField="value"
              textField="label" />
          </div>

          <div>to</div>

          <div>
            <Field
              name="age_high"
              type="number"
              component={renderDropdownList}
              data={this.ageOptions}
              valueField="value"
              textField="label" />
          </div>

          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>
    );
  }
}

const renderDropdownList = ({ input, meta, ...rest }) =>
     <DropdownList {...input} {...rest} />

function mapStateToProps(state) {
  return { initialValues: state.usersReducer.searchPreference };
}

const form = reduxForm({
  form: 'searchBox',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
});

export default connect(mapStateToProps, actions)(form(SearchBox));
