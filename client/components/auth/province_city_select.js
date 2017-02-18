import React, { Component } from 'react';
import Select from 'react-select';
import ProvinceCity from '../../services/province_city/province_city';

class ProvinceCitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: ProvinceCity.query().map((p) => { return { value: p, label: p } }),
      province: "",
    };
  }

  handleProvinceChange(option) {
    console.log("Selected province: " + option.value);
    this.setState({ province: option.value })
  }

  render() {
    return (
      <div>
        <Select value={this.state.province}
                options={this.state.provinces}
                placeholder="Select a province..."
                clearable={false}
                onChange={this.handleProvinceChange.bind(this)}
                name="form-field-name"
                />

      </div>
    )
  }
}


export default ProvinceCitySelect;
