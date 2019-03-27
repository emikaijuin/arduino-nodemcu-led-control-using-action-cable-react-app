import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Group from "../containers/Group";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class GroupsIndex extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("http://localhost:3001/groups")
      .then(response => {
        this.setState({ ...response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderGroups = () =>
    this.state.groups.map(group => (
      <Group name={group.name} lights={group.lights} rgb={group.rgb_state} />
    ));

  render() {
    return (
      <div>
        <h1>My Lights</h1>
        <div className="groups-container">
          <Grid container spacing={8}>
            {this.state.groups ? this.renderGroups() : function() {}}
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
