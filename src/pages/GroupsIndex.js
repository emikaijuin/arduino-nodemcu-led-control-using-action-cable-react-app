import React, { Component } from "react";

import Group from "../containers/Group";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";

class GroupsIndex extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("http://localhost:3001/groups")
      .then(response => {
        this.setState({ ...this.state, ...response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderGroups = () =>
    this.state.groups.map(group => (
      <Group
        id={group.id}
        name={group.name}
        lights={group.lights}
        rgb={group.rgb_state}
      />
    ));

  render() {
    return (
      <div>
        <div className="groups-container">
          <Grid container spacing={8}>
            {this.state.groups ? this.renderGroups() : function() {}}
          </Grid>
        </div>
      </div>
    );
  }
}

export default GroupsIndex;
