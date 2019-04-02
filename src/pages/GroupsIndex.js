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

  ungroupedLights = () =>
    this.props.lights.filter(light => !light.groups.length);

  render() {
    return (
      <div>
        <div className="groups-container">
          <Grid container spacing={8}>
            {this.props.groups ? this.renderGroups() : function() {}}
            <Group
              lights={this.props.lights ? this.ungroupedLights() : []}
              name="Ungrouped Lights"
              id={null}
            />
          </Grid>
        </div>
      </div>
    );
  }
}

export default GroupsIndex;
