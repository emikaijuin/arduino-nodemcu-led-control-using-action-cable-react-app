import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ColorModal from "../components/ColorModal";
import ColorButtons from "../components/ColorButtons";
import Light from "../components/Light";
import { Container, Draggable } from "react-smooth-dnd";

class Group extends Component {
  state = {
    showColorPicker: false,
    rgb: this.props.rgb,
    lights: this.props.lights || []
  };

  componentDidMount() {
    if (!this.props.id) {
      return; // don't make api call for ungrouped lights group
    }
    axios
      .get(`http://localhost:3001/groups/${this.props.id}`)
      .then(result => {
        this.setState({ ...result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderLights = () =>
    this.state.lights.map(light => (
      <Draggable key={light.id}>
        <Light name={light.name} id={light.id} />
      </Draggable>
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

          <ColorButtons
            id={this.props.id}
            rgb={this.currentRgb()}
            openColorPicker={this.openColorPicker}
          />
        </Paper>
      </Grid>
    );
  }
}

export default Group;
