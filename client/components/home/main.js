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
        <UserCard key={user.id} {...user} />
      );
    });
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="breathable-container">
          <SearchBox />
          {this.renderUsers()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.usersReducer.users };
}

export default connect(mapStateToProps, actions)(Home);
