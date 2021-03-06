import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth_actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/welcome');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/welcome');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      currentUser: state.usersReducer.currentUser
    };
  }

  return connect(mapStateToProps)(Authentication);
}
