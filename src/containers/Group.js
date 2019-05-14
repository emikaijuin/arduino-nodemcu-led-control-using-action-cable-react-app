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
    console.log(process.env.REACT_APP_DOMAIN);
    if (!this.props.id) {
      return; // don't make api call for ungrouped lights group
    }
    axios
      .get(`${process.env.REACT_APP_DOMAIN}/groups/${this.props.id}`)
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
      .put(`${process.env.REACT_APP_DOMAIN}/groups/${this.props.id}`, {
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

  getCardPayload = (groupId, index) => {
    return {
      groupId: groupId,
      light: this.state.lights[index]
    };
  };

  onCardDrop = (groupId, dropResult) => {
    console.log(dropResult);
    if (dropResult.addedIndex != null) {
      axios
        .post(
          `${process.env.REACT_APP_DOMAIN}/lights/${
            dropResult.payload.light.id
          }/add_to_group`,
          {
            light_id: dropResult.payload.light.id,
            group_id: groupId
          }
        )
        .then(result => {
          this.setState({ ...result.data });
          this.props.updateUngroupedLights();
        })
        .catch(error => {
          console.log(error);
        });
    }
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
            <Container
              groupName="col"
              onDrop={e => this.onCardDrop(this.props.id, e)}
              getChildPayload={index =>
                this.getCardPayload(this.props.id, index)
              }
              dragClass="drag-light"
              dropClass="drag-light-drop"
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: "drop-preview"
              }}
              dropPlaceholderAnimationDuration={200}
            >
              {this.state.lights.length ? (
                this.renderLights()
              ) : (
                <li>No Lights</li>
              )}
            </Container>
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
