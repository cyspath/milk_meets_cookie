import React, { Component } from 'react';
import { Link } from 'react-router'

class NavLink extends Component {
  render() {
    let className;
    if (this.props.location.pathname === "/" && this.props.to === "/") {
      className = "active";
    } else if (this.props.location.pathname === this.props.to.slice(1)) {
      className = "active";
    } else {
      className = "";
    }
    return (
      <li className={className}><Link {...this.props}/></li>
    );
  }
}

export default NavLink;
