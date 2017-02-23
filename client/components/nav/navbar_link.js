import React, { Component } from 'react';
import { Link } from 'react-router'

class NavLink extends Component {
  render() {
    const currentPath = this.props.location.pathname;
    let className;
    
    if (currentPath === "/" && this.props.to === "/") {
      className = "active";
    } else if (currentPath === this.props.to.slice(1)) {
      className = "active";
    } else {
      className = "";
    }
    return (
      <li className={className}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
}

export default NavLink;
