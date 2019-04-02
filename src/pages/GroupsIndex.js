import React, { Component } from "react";

import Group from "../containers/Group";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class GroupsIndex extends Component {
  renderGroups = () =>
    this.props.groups.map(group => (
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
