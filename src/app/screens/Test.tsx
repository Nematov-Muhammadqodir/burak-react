//@ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      brand: "Chevralet",
      model: "Damas",
      color: "white",
      year: 2002,
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    //* Runs after the first render
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    //^ Runs before component unmount
  }

  componentDidUpdate() {}
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>

        <button onClick={this.changeDetail}>Change</button>
      </div>
    );
  }
}

export default Test;
