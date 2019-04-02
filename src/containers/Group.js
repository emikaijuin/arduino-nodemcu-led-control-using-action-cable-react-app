import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ColorModal from "../components/ColorModal";

class Group extends Component {
  state = { showColorPicker: false, rgb: this.props.rgb };

  renderLights = () =>
    this.props.lights.map(light => (
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
      .put(`http://localhost:3001/groups/${this.props.id}`, {
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

          <ul style={{ overflowY: "auto" }} className="lights-list">
            {this.props.lights.length ? (
              this.renderLights()
            ) : (
              <li>No Lights</li>
            )}
          </ul>

          <div style={{ position: "absolute", right: "3%", bottom: "5%" }}>
            <Grid container spacing={8}>
              <Grid item>
                <Button variant="outlined" disabled={!this.props.id}>
                  off
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" disabled={!this.props.id}>
                  on
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    color: this.currentRgb(),
                    border: `1px solid ${this.currentRgb()}`
                  }}
                  onClick={this.openColorPicker}
                  disabled={!this.props.id}
                >
                  color
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default Group;
