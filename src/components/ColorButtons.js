import React from "react";
import { Grid, Button } from "@material-ui/core";

const ColorButtons = props => {
  return (
    <div style={{ position: "absolute", right: "3%", bottom: "5%" }}>
      <Grid container spacing={8}>
        <Grid item>
          <Button variant="outlined" disabled={!props.id}>
            off
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" disabled={!props.id}>
            on
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              color: props.rgb,
              border: `1px solid ${props.rgb}`
            }}
            onClick={props.openColorPicker}
            disabled={!props.id}
          >
            color
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorButtons;
