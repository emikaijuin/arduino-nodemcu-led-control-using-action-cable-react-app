import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ColorModal from "../components/ColorModal";

class Group extends Component {
  state = { showColorPicker: false };

  componentDidMount() {
    this.setState({ ...this.state, ...this.props });
  }

  renderLights = () =>
    this.state.lights.map(light => (
      <li>{light.name ? light.name : "Unnamed"}</li>
    ));

  currentRgb = () =>
    this.state.rgb
      ? `rgb(${this.state.rgb.r},${this.state.rgb.g},${this.state.rgb.b})`
      : "#fafafa";

  openColorPicker = () => {
    this.setState({ showColorPicker: true });
  };

  closeColorPicker = () => {
    this.setState({ showColorPicker: false });
  };

  selectColor = rgb => {
    this.setRgb(rgb);
    this.closeColorPicker();
  };

  setRgb = rgb => {
    axios
      .put(`http://localhost:3001/groups/${this.state.id}`, {
        group: {
          rgb: {
            ...rgb
          }
        }
      })
      .then(result => {
        this.setState({ rgb: result.data.rgb });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <ColorModal
          isOpen={this.state.showColorPicker}
          handleClose={this.closeColorPicker}
          selectColor={this.selectColor}
        />
        <Paper square={true} className="light-group">
          <h2>{this.props.name}</h2>
          <ul style={{ overflowY: "auto" }}>
            {this.state.lights ? this.renderLights() : function() {}}
          </ul>
          <div style={{ position: "absolute", right: "3%", bottom: "5%" }}>
            <Button variant="outlined">off</Button>
            <Button variant="outlined">on</Button>
            <Button
              style={{
                color: this.currentRgb(),
                border: `1px solid ${this.currentRgb()}`
              }}
              onClick={this.openColorPicker}
            >
              color
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default Group;
