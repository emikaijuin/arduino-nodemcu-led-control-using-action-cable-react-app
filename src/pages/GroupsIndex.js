import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Group from "../containers/Group";
import Grid from "@material-ui/core/Grid";

class GroupsIndex extends Component {
  state = {};

  renderGroups = () =>
    [
      "Master Bedroom",
      "Dining Room",
      "Guest Bathroom",
      "Living Room",
      "Kitchen"
    ].map(name => <Group name={name} />);

  render() {
    return (
      <div>
        <h1>My Lights</h1>
        <div className="groups-container">
          <Grid container spacing={8}>
            {this.renderGroups()}
          </Grid>
        </div>
        <Button color="primary" variant="outlined">
          This is a button
        </Button>
      </div>
    );
  }
}

export default GroupsIndex;
