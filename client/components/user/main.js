import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user_actions';
import * as chatActions from '../../actions/chat_actions';

class UserDetail extends Component {
  componentWillMount() {
    this.props.fetchUserDetail(this.props.params.id);
  }

  handleToggleLike() {
    let active = this.likedStatus() ? false : true;
    this.props.toggleLikeUser({ active: active, liked_user_id: this.props.user.id });
  }

  likedStatus() {
    return this.props.likedUserIds.has(this.props.user.id);
  }

  handleToggleChat() {
    this.props.openChat(this.props.currentUser, this.props.user);
  }

  renderOnlineIndicator() {
    if (this.props.onlineUsers[this.props.user.id]) {
      return <div className="online-indicator online"></div>
    } else {
      return <div className="online-indicator"></div>
    }
  }

  renderBanner() {
    let liked = this.likedStatus();
    return (
      <div className="profile-banner">
        <div className="row">

          <div className="col-sm-2 inner-1">
            <div><img src={this.props.user.avatar_url} alt="=("/></div>
          </div>

          <div className="col-sm-6 inner-2">
            <div className="username">{this.props.user.username}</div>{this.renderOnlineIndicator()}
            <div className="info">{this.props.user.age} · {this.props.user.province} {this.props.user.city} </div>
          </div>

          <div className="col-sm-4 inner-3">
            <button onClick={this.handleToggleChat.bind(this)} className={`flat-btn`}>
              <span>Message</span>
            </button>
            <button onClick={this.handleToggleLike.bind(this)} className={`like-btn flat-btn ${liked && 'active'}`}>
              <i className="fa fa-star"></i>
              <span>{liked ? 'Liked' : 'Like'}</span>
            </button>
          </div>

        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div className="profile-content">
        <div className="row">

          <div className="col-sm-5 inner-1">

          </div>

          <div className="col-sm-7 inner-2">
          </div>

        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <div className="profile-banner-container">{this.renderBanner()}</div>
        <div className="profile-content-container">{this.renderContent()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.usersReducer.currentUser,
    user: state.usersReducer.userDetail,
    likedUserIds: state.usersReducer.likedUserIds,
    onlineUsers: state.usersReducer.onlineUsers
  };
}

const actions = Object.assign(userActions, chatActions);
export default connect(mapStateToProps, actions)(UserDetail);
