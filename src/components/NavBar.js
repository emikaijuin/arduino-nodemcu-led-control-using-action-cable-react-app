import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import NewGroupForm from "../containers/NewGroupForm";

const styles = {
  root: {
    flexGrow: 1,
    color: "white",
    marginBottom: "15vh"
  },
  appBar: {
    position: "fixed",
    backgroundColor: "#00897b",
    padding: "15px 0"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: -37.5,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#80cbc4",
    "&:hover": {
      backgroundColor: "#4db6ac"
    },
    toolbar: {
      color: "inherit"
    }
  }
};

class NavBar extends Component {
  state = {
    showNewGroupForm: false
  };

  showNewGroupForm = () => this.setState({ showNewGroupForm: true });

  hideNewGroupForm = () => this.setState({ showNewGroupForm: false });

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Fab className={classes.fabButton}>
              <AddIcon onClick={this.showNewGroupForm} />
            </Fab>
            <Typography
              variant="h3"
              className={classes.typography}
              color="inherit"
            >
              My Devices
            </Typography>
          </Toolbar>
        </AppBar>
        <NewGroupForm
          isOpen={this.state.showNewGroupForm}
          handleClose={this.hideNewGroupForm}
          updateGroups={this.props.updateGroups}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
