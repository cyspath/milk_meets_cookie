import React, { Component } from 'react';
import WelcomeForm from './form';
import Signup from '../auth/signup';

class WelcomeMain extends Component {
  constructor() {
   super();
   this.state = {
     step: 1,
     searchCriteria: { sex: "female", lookingFor: "male" }
   };
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
        return <WelcomeForm nextStep={this.nextStep.bind(this)} />
			case 2:
				return <Signup searchCriteria={this.state.searchCriteria} />
		}
	}
}

export default WelcomeMain;
