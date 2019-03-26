import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Group from "./pages/Groups";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Group />
      </div>
    );
  }
}

export default App;
