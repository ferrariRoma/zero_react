import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      <li>
        <b>{this.props.value.eng}</b> {this.props.value.kor}
      </li>
    );
  }
}

export default Try;
