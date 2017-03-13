import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions/auth_actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div className={`${this.constructor.name}-component`}>
      Sorry to see you go...
      <Link to="/signin"> Sign In »</Link>
    </div>;
  }
}

export default connect(null, actions)(Signout);
