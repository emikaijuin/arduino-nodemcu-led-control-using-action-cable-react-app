import React, { Component } from "react";
import "./App.css";
import GroupIndex from "./pages/GroupsIndex";
import NavBar from "./components/NavBar";
class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <GroupIndex />
      </div>
    );
  }
}

export default App;
