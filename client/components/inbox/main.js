import React, { Component } from 'react';

export default class Inbox extends Component {
  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <h4 >
          This is Inbox page
        </h4>
      </div>
    );
  }
}
