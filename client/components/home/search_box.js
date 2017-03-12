import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actions from '../../actions/home_actions';
import ProvinceCity from '../../modules/province_city/province_city';

class SearchBox extends Component {
  constructor() {
    super();
    this.sexOptions =  [{ label: 'women', value: 'female' }, { label: 'men', value: 'male' }];
    this.ageOptions = generateRangeOptions(18, 100);
    this.heightOptions = generateRangeOptions(150, 200);
    this.provinceOptions = ProvinceCity.query().map((p) => { return { value: p, label: p } });
    this.state = {
      expand: false,
      province: undefined,
      cityOptions: [],
    }
  }

  handleFormSubmit(formProps) {
    formProps.sex = formProps.sex && formProps.sex.value ? formProps.sex.value : formProps.sex
    formProps.province = formProps.province && formProps.province.value ? formProps.province.value : formProps.province
    formProps.city = formProps.city && formProps.city.value ? formProps.city.value : formProps.city

    this.props.fetchUsers(formProps);
  }

  handleExpand() {
    this.setState({ expand: !this.state.expand });
  }

  handleProvinceChange(option) {
    this.props.formValues.city = null;
    // this.setState({
    //   cityOptions: ProvinceCity.query(option.value).map((p) => { return { value: p, label: p } }),
    // })
  }

  handleCityToggle() {
    if (!this.props.formValues.province) {
      return;
    }
    const province = this.props.formValues.province.value ? this.props.formValues.province.value : this.props.formValues.province;
    this.setState({
      cityOptions: ProvinceCity.query(province).map((p) => { return { value: p, label: p } }),
    })
  }

  render() {
    console.log(this.props.searchPreference);
    console.log(this.props.initialValues);
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.constructor.name}-component`}>
        <form onSubmit={handleSubmit(props => this.handleFormSubmit(props))} className="">

          <div className="search-box-row">

            <div className="search-box-item-label"><span>Show</span></div>

            <div className="search-box-item-wrapper">
              <Field
                name="sex"
                className="search-box-item-sex"
                component={renderDropdownList}
                data={this.sexOptions}
                valueField="value"
                textField="label"/>
            </div>

            <div className="search-box-item-label"><span>between ages</span></div>

            <div className="search-box-item-wrapper">
              <Field
                name="age_low"
                type="number"
                className="search-box-item-age"
                component={renderDropdownList}
                data={this.ageOptions}
                valueField="value"
                textField="label" />
            </div>

            <div className="search-box-item-label"><strong><span>- </span></strong></div>

            <div className="search-box-item-wrapper">
              <Field
                name="age_high"
                type="number"
                className="search-box-item-age"
                component={renderDropdownList}
                data={this.ageOptions}
                valueField="value"
                textField="label" />
            </div>

            <div className="search-box-item-label"><span>located</span></div>

            <div className="search-box-item-wrapper">
              <Field
                name="province"
                placeholder="province"
                className="search-box-item-province"
                onChange={this.handleProvinceChange.bind(this)}
                component={renderDropdownList}
                data={this.provinceOptions}
                valueField="value"
                textField="label" />
            </div>

            <div className="search-box-item-wrapper">
              <Field
                name="city"
                placeholder="city"
                className="search-box-item-city"
                onToggle={this.handleCityToggle.bind(this)}
                component={renderDropdownList}
                data={this.state.cityOptions}
                valueField="value"
                textField="label" />
            </div>

            <div className="search-box-item-label">
              <strong>
                <span onClick={this.handleExpand.bind(this)}>
                  <i className={`fa ${this.state.expand ? 'fa-chevron-circle-up' : 'fa-chevron-circle-down'}`}></i>
                </span>
              </strong>
            </div>

            <div className="search-box-btn-wrapper">
              <button type="submit" className="btn btn-primary">Search</button>
            </div>

          </div>

          <div className={`search-box-row ${this.state.expand ? 'slide-down' : 'slide-hidden'}`}>

            <div className="search-box-item-label"><span>height</span></div>
            <div className="search-box-item-wrapper">
              <Field
                name="height_low"
                type="number"
                className="search-box-item-height"
                component={renderDropdownList}
                data={this.heightOptions}
                valueComponent={UnitInput}
                valueField="value"
                textField="label" />
            </div>

            <div className="search-box-item-label"><strong><span>-</span></strong></div>

            <div className="search-box-item-wrapper">
              <Field
                name="height_high"
                type="number"
                className="search-box-item-height"
                component={renderDropdownList}
                data={this.heightOptions}
                valueComponent={UnitInput}
                valueField="value"
                textField="label" />
            </div>
          </div>

        </form>
      </div>
    );
  }
}

const generateRangeOptions = (start, end) => Array.from({ length: (end - start) }, (v, k) => k + start);

const renderDropdownList = ({ input, meta, ...rest }) =>
     <DropdownList {...input} {...rest} />

class UnitInput extends Component {
  render() {
    return (<span>{ this.props.item }cm</span>);
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.usersReducer.searchPreference,
    formValues: getFormValues('searchBox')(state)
  };
}

const form = reduxForm({
  form: 'searchBox',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
});

export default connect(mapStateToProps, actions)(form(SearchBox));
