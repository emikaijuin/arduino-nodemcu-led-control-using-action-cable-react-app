import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class Group extends Component {
  state = {};

  render() {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Paper>I am group {this.props.num}</Paper>
      </Grid>
    );
  }
}

export default Group;
