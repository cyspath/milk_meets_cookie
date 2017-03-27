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
            {this.renderUserDetails()}
          </div>

          <div className="col-sm-7 inner-2">
          </div>

        </div>
      </div>
    )
  }

  renderUserDetails() {
    const user = this.props.user;

    const section1 = [];
    if (user.gender === 'female') {
      section1.push('Woman');
    } else if (user.gender === 'male') {
      section1.push('Man');
    }
    section1.push(user.status);
    if (Number(user.height)) section1.push(`${user.height} cm`);
    if (user.sign) section1.push(user.sign);

    const section2 = [];
    if (user.education) section2.push(`Has a ${user.education} degree`);
    if (user.industry) section2.push(user.industry === 'Student' ? 'Currently a student' : `Works in ${user.industry}`);
    if (Number(user.income)) section2.push(`Takes home $${user.income} a year`);

    const section3 = [];
    if (user.smokes) section3.push(user.smokes);
    if (user.drinks) section3.push(user.drinks);
    if (user.pets) section3.push(user.pets.split(',').map((p) => 'Has ' + p));

    return (
      <div>
        <div>
          <i className="fa fa-id-card-o"></i>
          <span>{section1.join(', ')}</span>
        </div>

        <div>
          {section2.length > 0 && <i className="fa fa-briefcase"></i>}
          <span>{section2.join(', ')}</span>
        </div>

        <div>
          {section2.length > 0 && <i className="fa fa-tags"></i>}
          <span>{section3.join(', ')}</span>
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
