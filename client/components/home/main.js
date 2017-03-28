import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/home_actions';
import UserCard from './user_card';
import SearchBox from './search_box';

class Home extends Component {
  componentWillMount() {
    this.props.fetchUsers({}); // based on preset default or user's last search pref
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <UserCard
          key={user.id}
          likedUserIds={this.props.likedUserIds}
          onlineUsers={this.props.onlineUsers}
          {...user} />
      );
    });
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <SearchBox />
        <div className="breathable-container">
          {this.renderUsers()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersReducer.users,
    likedUserIds: state.usersReducer.likedUserIds,
    onlineUsers: state.usersReducer.onlineUsers
  };
}

export default connect(mapStateToProps, actions)(Home);
