import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SignupP1 from './signup_p1';
import SignupP2 from './signup_p2';

class SignupMain extends Component {
  constructor() {
   super();
   this.state = {
     step: 1,
     searchCriteria: { sex: "female", lookingFor: "male" }
   };
  }

  componentWillMount() {
    if (this.props.authenticated) { // if already authenicated, redirect to root
      browserHistory.push('/');
    }
  }

  nextStep(searchCriteria) {
    this.setState({
      searchCriteria: searchCriteria,
      step : this.state.step + 1
    });
  }

	render() {
		switch (this.state.step) {
			case 1:
        return <SignupP1 nextStep={this.nextStep.bind(this)} />
			case 2:
				return <SignupP2 searchCriteria={this.state.searchCriteria} />
		}
	}
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}
export default connect(mapStateToProps, null)(SignupMain);
