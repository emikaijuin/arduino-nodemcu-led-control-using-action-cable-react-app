import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    backgroundColor: "rgba(255,255,255,0.95)"
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    padding: "10%",
    overflow: "hidden"
  }
};

class InnerColorModal extends Component {
  constructor(props) {
    super(props);
    this.rgb = "";
  }

  updateColor = (color, event) => {
    this.rgb = color.rgb;
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.handleClose}
        BackdropProps={{
          classes: {
            root: classes.root
          }
        }}
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}
      >
        <CirclePicker
          style={{ zIndex: 1 }}
          onChangeComplete={this.updateColor}
        />
        <Button
          variant="outlined"
          onClick={() => this.props.selectColor(this.rgb)}
          style={{
            marginTop: "16px"
          }}
        >
          select
        </Button>
      </Dialog>
    );
  }
}

InnerColorModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const ColorModal = withStyles(styles)(InnerColorModal);

export default ColorModal;
