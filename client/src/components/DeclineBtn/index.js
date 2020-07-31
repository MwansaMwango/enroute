import React from "react";
import "./style.css";
import { Button } from "@material-ui/core";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeclineBtn(props) {
  return (
    <Button 
      {...props}
      variant="contained"
    style= {{"background": "red", "color": "white"}}

      tabIndex="0"
    >
      DECLINE
    </Button>
  );
}

export default DeclineBtn;
