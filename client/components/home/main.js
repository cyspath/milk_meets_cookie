import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/home_actions';
import UserCard from './user_card';

class Home extends Component {
  componentWillMount() {
    this.props.fetchUsers({});
  }

  renderUsers() {
    // console.log(this.props.users);
    return this.props.users.map((user) => {
      return (
        <UserCard key={user.id} {...user} />
      );
    });
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        {this.renderUsers()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.usersReducer.users };
}

export default connect(mapStateToProps, actions)(Home);
