import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actions from '../../actions/home_actions';

class SearchBox extends Component {
  constructor() {
    super();
    this.lookingFor =  [{ label: 'Woman', value: 'female' }, { label: 'Man', value: 'male' }];
  }

  handleFormSubmit(formProps) {
    this.props.fetchUsers(formProps);
    // const params = Object.assign(formProps, this.props.searchCriteria);
    // params.dob = new Date(`${params.month}/${params.day}/${params.year}`)
    // params.province = params.province.value
    // params.city = params.city.value
    // this.props.signupUser(params);
  }

  handleChange(option) {

  }

  render() {
    // <DropdownList
    //   name="lookingFor"
    //   data={this.lookingFor}
    //   onChange={this.handleProvinceChange.bind(this)}
    //   defaultValue={this.props.currentUser.looking_for}
    //   valueField="value"
    //   textField="label"/>

              // <Field
              //   name="lookingFor"
              //   component={renderDropdownList}
              //   defaultValue={this.props.currentUser.looking_for}
              //   data={this.lookingFor}
              //   valueField="value"
              //   textField="label"/>

    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.constructor.name}-component`}>
        <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))} className="">

            <DropdownList
              name="lookingFor"
              data={this.lookingFor}
              onChange={this.handleChange.bind(this)}
              value={this.props.currentUser.looking_for}
              valueField="value"
              textField="label"/>

          <button type="submit" className="btn btn-primary">Sign Up!</button>
        </form>
      </div>
    );
  }
}


const renderDropdownList = ({ input, meta, ...rest }) =>
     <DropdownList {...input} {...rest} />

// const DropdownListField = ({ input, meta, ...rest }) => {
//   function handleChange(option) {
//     debugger
//     let value = option;
//     const { valueField } = { input, meta, ...rest }
//     if (valueField) {
//     	value = option[valueField]
//     }
//     input.onChange(value)
//   }
//   return (
//     <DropdownList {...input} {...rest} value={input.value} onChange={handleChange} />
//   )
// }

function mapStateToProps(state) {
  return { currentUser: state.usersReducer.currentUser };
}

const form = reduxForm({
  form: 'searchBox',
  fields: ['lookingFor']
});

export default connect(mapStateToProps, actions)(form(SearchBox));
