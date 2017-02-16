import React, { Component } from 'react';
import { Link } from 'react-router';

class WelcomeForm extends Component {
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.nextStep({ sex: this.refs.self.value, lookingFor: this.refs.other.value });
  }

	render() {
    return (
      <div className="auth-form">
        <form onSubmit={this.handleFormSubmit.bind(this)} className="form-validation">

          <div className="form-title-row"><h1>Join the best free dating site today</h1></div>

          <div className="form-row">
            <label>
              <span>I'm a</span>
              <select name="self" ref="self">
                <option value="female">Woman</option>
                <option value="male">Man</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Looking for a</span>
              <select name="other" ref="other">
                <option value="male">Man</option>
                <option value="female">Woman</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <button action="submit">Continue</button>
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

export default WelcomeForm;
