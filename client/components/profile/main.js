import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    return (
      <div className={`${this.constructor.name}-component`}>
        <h4 >
          This is profile page
        </h4>
      </div>
    );
  }
}
