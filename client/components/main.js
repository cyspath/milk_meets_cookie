import React, { Component } from 'react';
import Navbar from './nav/navbar';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <Navbar {...this.props} />
        {this.props.children}
      </div>
    );
  }
}
