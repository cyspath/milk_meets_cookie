import React, { Component } from 'react';
import Select from 'react-select';
import ProvinceCity from '../../services/province_city/province_city';

class ProvinceCitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: ProvinceCity.query().map((p) => { return { value: p, label: p } }),
      province: undefined,
      cities: [],
      city: undefined
    };
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
    console.log(this.state.cities);
    console.log("Selected city: " + option.value);
    this.setState({ city: option.value })
  }

  renderProvince() {
    return (
      <Select value={this.state.province}
              className="select-province"
              options={this.state.provinces}
              placeholder="Select a province..."
              clearable={false}
              onChange={this.handleProvinceChange.bind(this)}
              name="form-field-name"
              backspaceRemoves={false}
              />
    )
  }

  renderCity() {
    if (this.state.province) {
      return (
        <Select value={this.state.city}
                className="select-city"
                options={this.state.cities}
                placeholder="Select a city..."
                clearable={false}
                onChange={this.handleCityChange.bind(this)}
                name="form-field-name"
                backspaceRemoves={false}
                noResultsText="Enter a province first"
                />
      )
    }
  }

  render() {
    return (
      <div className="Select-container">
        <input {...location} />
        {this.renderProvince()}
        {this.renderCity()}
      </div>
    )
  }
}


export default ProvinceCitySelect;
