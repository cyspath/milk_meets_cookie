import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user_actions';

class UserDetail extends Component {
  componentWillMount() {
    this.props.fetchUserDetail(this.props.params.id);
  }

  renderUserDetail() {
    return (
      <div>
        <h1>User Detail:</h1>
        <div>{this.props.user.email}</div>
        <div>age: {this.props.user.dob}</div>
        <div>sex: {this.props.user.sex}</div>
        <div>wants to meet: {this.props.user.looking_for}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        {this.renderUserDetail()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.usersReducer.userDetail };
}

export default connect(mapStateToProps, actions)(UserDetail);
