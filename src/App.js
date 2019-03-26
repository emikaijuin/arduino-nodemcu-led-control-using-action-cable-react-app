import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GroupIndex from "./pages/GroupsIndex";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GroupIndex />
      </div>
    );
  }
}

export default App;
