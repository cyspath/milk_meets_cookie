import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/user_actions';

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

  renderUserDetail() {
    return (
      <div>
        <h1>{this.props.user.username}</h1>
        <img src={this.props.user.avatar_url} alt="=("/>
        <div>{this.props.user.email}</div>
        <div>age: {this.props.user.age}</div>
        <div>gender: {this.props.user.gender}</div>
        <div>wants to meet: {this.props.user.looking_for}</div>
      </div>
    );
  }

  render() {
    let liked = this.likedStatus();
    return (
      <div className={`${this.constructor.name}-component`}>
        {this.renderUserDetail()}
        <button onClick={this.handleToggleLike.bind(this)} className={`like-btn flat-btn ${liked && 'active'}`}>
          <i className="fa fa-star"></i>
          <span>{liked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.usersReducer.userDetail,
    likedUserIds: state.usersReducer.likedUserIds
  };
}

export default connect(mapStateToProps, actions)(UserDetail);
