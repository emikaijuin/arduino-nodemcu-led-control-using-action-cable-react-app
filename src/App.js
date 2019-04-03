import React, { Component } from "react";
import "./App.css";
import GroupsIndex from "./pages/GroupsIndex";
import NavBar from "./components/NavBar";
import axios from "axios";
class App extends Component {
  state = {};
  componentDidMount() {
    this.fetchInformation();
  }

  fetchInformation = () => {
    axios
      .get("http://localhost:3001/groups")
      .then(result => {
        this.setState({ ...result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar updateGroups={this.fetchInformation} />
        {this.state.ungroupedLights && this.state.groups ? (
          <GroupsIndex
            groups={this.state.groups}
            ungroupedLights={this.state.ungroupedLights}
            updateUngroupedLights={this.fetchInformation}
          />
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default App;
