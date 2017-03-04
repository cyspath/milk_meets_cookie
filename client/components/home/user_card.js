import React, { Component } from 'react';
import { Link } from 'react-router'
import * as actions from '../../actions/user_actions';

class UserCard extends Component {
  constructor() {
   super();
  }

  handleLike() {
    let active = this.props.liked ? false : true;
    actions.likeUser({
      active: active,
      liked_user_id: this.props.id
    }).then((resp) => {
      debugger
    })
  }

  render() {
    const user = this.props;
    return (
      <div className={`${this.constructor.name}-component user-card-wrapper`}>
        <div className="user-card">
          <Link to={"user/" + user.id}>
            <div>
              <img src={user.avatar_url} alt="=("/>
            </div>
            <div className="user-card__text-box">
              <div className="username">{user.username}</div>
              <div className="userinfo">{user.age} · {user.province} {user.city}</div>
            </div>
          </Link>
          <button onClick={this.handleLike.bind(this)} className={`like-btn flat-btn ${user.liked && 'active'}`}>
            <i className="fa fa-star"></i>
            <span>{user.liked ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>
    );
  }
}

export default UserCard;
