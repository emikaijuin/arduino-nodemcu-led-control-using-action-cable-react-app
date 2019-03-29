import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = {
  root: {
    flexGrow: 1,
    color: "white",
    marginBottom: "100px"
  },
  appBar: {
    position: "fixed"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
    backgroundColor: "#80cbc4",
    "&:hover": {
      backgroundColor: "#4db6ac"
    }
  }
};

const NavBar = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="white">
        <Toolbar>
          <Fab className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <Typography variant="h3" color="black">
            My Devices
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
