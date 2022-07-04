import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      <li>
        <b>{this.props.el.try}</b> {this.props.el.result}
      </li>
    );
  }
}

export default Try;
