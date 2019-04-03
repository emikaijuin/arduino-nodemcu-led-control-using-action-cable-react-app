import React, { Component } from "react";

import Group from "../containers/Group";
import Grid from "@material-ui/core/Grid";

class GroupsIndex extends Component {
  state = {
    ungroupedLights: this.props.ungroupedLights,
    groups: this.props.groups
  };

  renderGroups = () =>
    // Group component should make API call individually to retrieve information, that way it avoids forcing a re-render after App is updated. Also, then probably don't need to pass down reference to fetchInformation function from App -> Group
    this.props.groups.map(group => (
      <Group
        key={group.id}
        id={group.id}
        name={group.name}
        rgb={group.rgb_state}
        updateUngroupedLights={this.props.updateUngroupedLights}
      />
    ));

  renderUngroupedLightsGroup = () => (
    <Group
      lights={this.state.ungroupedLights}
      name="Ungrouped Lights"
      updateGroups={this.props.updateGroups}
    />
  );

  render() {
    return (
      <div>
        <div className="groups-container">
          <Grid container spacing={8}>
            {this.renderUngroupedLightsGroup()}
            {this.renderGroups()}
          </Grid>
        </div>
      </div>
    );
  }
}

export default GroupsIndex;
