import React from "react";

const Light = props => (
  <li style={{ cursor: "move" }} id={`light-${props.id}`}>
    {props.name ? props.name : "Unnamed"}
  </li>
);

export default Light;
