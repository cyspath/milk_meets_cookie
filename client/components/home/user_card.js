import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import * as actions from '../../actions/user_actions';

class UserCard extends Component {
  constructor() {
    super();
  }

  handleToggleLike() {
    let active = this.likedStatus() ? false : true;
    this.props.toggleLikeUser({ active: active, liked_user_id: this.props.id });
  }

  likedStatus() {
    return this.props.likedUserIds.has(this.props.id);
  }

  renderOnlineIndicator() {
    if (this.props.onlineUsers[this.props.id]) {
      return <div className="online-indicator online">Online</div>
    } else {
      return <div className="online-indicator">Offline</div>
    }
  }

  render() {
    let user = this.props;
    let liked = this.likedStatus();
    return (
      <div className={`${this.constructor.name}-component user-card-wrapper`}>
        <div className="user-card">
          <Link to={"user/" + user.id}>
            <div className="user-card-img-wrapper">
              <img src={user.avatar_url} alt="=("/>
            </div>
            {this.renderOnlineIndicator()}
            <div className="user-card__text-box">
              <div className="username">{user.username}</div>
              <div className="userinfo">{user.age} · {user.province} {user.city} {user.height && `${user.height}cm`}</div>
            </div>
          </Link>
          <button onClick={this.handleToggleLike.bind(this)} className={`like-btn flat-btn ${liked && 'active'}`}>
            <i className="fa fa-star"></i>
            <span>{liked ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(UserCard);
