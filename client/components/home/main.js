import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/home_actions';

class Home extends Component {
  componentWillMount() {
    this.props.fetchUsers({});
  }

  renderUsers() {
    // console.log(this.props.users);
    return this.props.users.map((user) => {
      return (
        <div key={user.id}>
          <Link to={"user/" + user.id}>
            <h3>{user.username}</h3>
            <img src={user.avatar_url} alt="=("/>
            <div>{user.email}</div>
            <div>age: {user.dob}</div>
            <div>sex: {user.sex}</div>
            <div>wants to meet: {user.looking_for}</div>
            <br></br>
          </Link>
        </div>
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
