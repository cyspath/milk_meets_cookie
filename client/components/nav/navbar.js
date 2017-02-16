import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavbarLink from './navbar_link';

class Navbar extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <ul className="nav navbar-nav" key={1}>
          <NavbarLink {...this.props} to="/">Home</NavbarLink>
          <NavbarLink {...this.props} to="/messages">Messages</NavbarLink>
          <NavbarLink {...this.props} to="/profile">Profile</NavbarLink>
        </ul>,
        <ul className="nav navbar-nav navbar-right" key={2}>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Dropdown<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><Link to="/messages"><i className="fa fa-envelope-square"></i> Messages</Link></li>
              <li><Link to="/profile"><i className="fa fa-user-circle"></i> Profile</Link></li>
              <li><Link to="/signout"><i className="fa fa-sign-out"></i> Sign Out</Link></li>
            </ul>
          </li>
        </ul>
      ];
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
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
            <Link className="navbar-brand" to="/">Cookie Meets Bagels</Link>
          </div>
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps)(Navbar);
