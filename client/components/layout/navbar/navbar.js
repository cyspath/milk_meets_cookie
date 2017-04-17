import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavLink from './navbar_link';
import Inbox from '../../chat/inbox';
import * as actions from '../../../actions/chat_actions';

class Navbar extends Component {
  constructor() {
    super();
    this.state = { showInbox: false };
  }

  componentWillMount() {
    this.props.fetchUnreadCount();
  }

  toggleInbox(value) {
    this.setState({ showInbox: value });
  }

  renderUnreadCount() {
    if (this.props.unreadCount !== 0) {
      return (
        <div className="unread-count">{this.props.unreadCount}</div>
      )
    }
  }

  renderLikeCount() {
    if (this.props.interestedUsers.length !== 0) {
      return (
        <div className="interested-count">{this.props.interestedUsers.length}</div>
      )
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      return [
        <ul className="nav navbar-nav" key={1}>
          <NavLink {...this.props} to="/">Browse</NavLink>
          <li onClick={this.toggleInbox.bind(this, true)}><a><i className="fa fa-comments"></i>{this.renderUnreadCount()}</a></li>
          {this.state.showInbox && <Inbox currentUser={this.props.currentUser} toggleInbox={this.toggleInbox.bind(this)}/>}
          <NavLink {...this.props} to="/likes"><i className="fa fa-star"></i>{this.renderLikeCount()}</NavLink>
          <NavLink {...this.props} to="/profile">Profile</NavLink>
        </ul>,
        <ul className="nav navbar-nav navbar-right" key={2}>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <div className="img-container"><img src={this.props.currentUser.avatar_url} alt=""/></div>
              <div className="text-container">{this.props.currentUser.username}</div>
            </a>
            <ul className="dropdown-menu">
              <li onClick={this.toggleInbox.bind(this, true)}><a><i className="fa fa-comments-o"></i>{this.renderUnreadCount()} Inbox</a></li>
              <li><Link to="/profile"><i className="fa fa-user-circle"></i> Profile</Link></li>
              <li><a href="https://github.com/cyspath/milk_meets_cookie" target="_"><i className="fa fa-github"></i> Source Code</a></li>
              <li><Link to="/signout"><i className="fa fa-sign-out"></i> Sign Out</Link></li>
            </ul>
          </li>
        </ul>
      ];
    } else {
      return (
        <ul className={`${this.constructor.name}-component nav navbar-nav navbar-right`}>
          <li className="nav-item">
            <Link to="/signin"><i className="fa fa-sign-in"></i> Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup"><i className="fa fa-user-plus"></i> Sign Up</Link>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <span><img src='/images/mc.png'/></span>
            </Link>
          </div>
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    unreadCount: state.chatReducer.unreadCount,
    interestedUsers: state.usersReducer.interestedUsers
  }
}
export default connect(mapStateToProps, actions)(Navbar);
