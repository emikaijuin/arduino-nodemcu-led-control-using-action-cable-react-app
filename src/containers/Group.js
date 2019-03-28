import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Group extends Component {
  state = {};

  componentDidMount() {
    this.setState({ ...this.props });
  }

  renderLights = () =>
    this.state.lights.map(light => (
      <li>{light.name ? light.name : "Unnamed"}</li>
    ));

  currentRgb = () =>
    `rgb(${this.state.rgb.r},${this.state.rgb.g},${this.state.rgb.b})`;

  render() {
    console.log(this.state.rgb);
    return (
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          square={true}
          className="light-group"
          style={{
            backgroundColor: this.state.rgb ? this.currentRgb() : "#fafafa"
          }}
        >
          <h2>{this.props.name}</h2>
          <ul>{this.state.lights ? this.renderLights() : function() {}}</ul>
        </Paper>
      </Grid>
    );
  }
}

export default Group;
