import React, { Component } from 'react';
import { Link } from 'react-router'

class UserBlock extends Component {
  render() {
    const user = this.props;
    return (
      <div className={`${this.constructor.name}-component`}>
        <Link to={"user/" + user.id}>
          <div>
            <span>{user.username}</span><span> {user.age}</span>
          </div>
          <div>
            <img src={user.avatar_url} alt="=("/>
          </div>
          <br></br>
        </Link>
      </div>
    );
  }
}

export default UserBlock;
