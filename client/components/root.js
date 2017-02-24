import React, { Component } from 'react';
import Navbar from './nav/navbar';

export default class Root extends Component {
  render() {
    debugger
    return (
      <div className={`${this.constructor.name}-component`}>
        <Navbar {...this.props} />
        {this.props.children}
      </div>
    );
  }
}
