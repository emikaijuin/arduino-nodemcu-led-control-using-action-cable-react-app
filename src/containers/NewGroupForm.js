import React, { Component } from "react";
import { Dialog, TextField, Button } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    backgroundColor: "#fafafa"
  }
};

class InnerGroupModal extends Component {
  state = {
    lights: [],
    name: ""
  };

  handleInput = event => this.setState({ name: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/groups", {
        group: {
          name: this.state.name
        }
      })
      .then(result => {
        this.props.handleClose();
        this.props.updateGroups();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Dialog open={this.props.isOpen}>
        <span
          style={{
            position: "absolute",
            top: "2%",
            right: "4%",
            cursor: "pointer"
          }}
          onClick={this.props.handleClose}
        >
          x
        </span>
        <div style={{ padding: "10%", backgroundColor: "#fafafa" }}>
          <h3>Add Group</h3>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="group[name]"
              label="Group Name"
              placeholder="Group Name"
              value={this.state.name}
              onChange={this.handleInput}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ marginTop: "8px", marginLeft: "auto" }}
                variant="outlined"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

InnerGroupModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const NewGroupForm = withStyles(styles)(InnerGroupModal);

export default NewGroupForm;
