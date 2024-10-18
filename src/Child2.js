import React, { Component } from "react";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props.data2);
  }

  render() {
    return <svg className="child2_svg"></svg>;
  }
}

export default Child2;
