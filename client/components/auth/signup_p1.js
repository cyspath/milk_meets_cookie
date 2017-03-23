import React, { Component } from 'react';
import { Link } from 'react-router';
import DropdownList from 'react-widgets/lib/DropdownList'

class SignupP1 extends Component {
  constructor(props) {
    super(props);
    this.selectList = [{ label: 'Woman', value: 'female' }, { label: 'Man', value: 'male' }];
    this.state = { gender: 'female', lookingFor: 'male' };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.nextStep(this.state);
  }

  handleSelectGender(option) {
    this.setState({ gender: option.value })
  }

  handleSelectLookingFor(option) {
    this.setState({ lookingFor: option.value })
  }

	render() {
    return (
      <div className={`${this.constructor.name}-component auth-form`}>
        <form onSubmit={this.handleFormSubmit.bind(this)} className="form-validation">

          <div className="form-title-row"><h1>Join the best free dating site today</h1></div>

          <div className="form-row">
            <label><span>I'm a</span></label>
            <div className="form-input-container form-input-select">
              <DropdownList
                data={this.selectList}
                defaultValue={this.state.gender}
                onChange={this.handleSelectGender.bind(this)}
                valueField="value"
                textField="label"/>
            </div>
          </div>

          <div className="form-row">
            <label><span>Looking for a</span></label>
            <div className="form-input-container form-input-select">
              <DropdownList
                data={this.selectList}
                defaultValue={this.state.lookingFor}
                onChange={this.handleSelectLookingFor.bind(this)}
                valueField="value"
                textField="label"/>
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="btn btn-primary">Continue</button>
          </div>

          <div className="form-row">
            <div className="form-footer">
              <span>Have an account?</span><Link to="/signin"> Sign in here »</Link>
            </div>
          </div>

        </form>
      </div>
    )
	}
}

const renderDropdownList = ({ input, ...rest }) => (
  <div className="inline-block">
    <DropdownList {...input} {...rest} />
  </div>
)

export default SignupP1;
