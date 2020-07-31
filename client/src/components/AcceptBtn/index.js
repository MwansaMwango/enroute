import React from "react";
import "./style.css";
import { Button } from "@material-ui/core";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AcceptBtn(props) {
  return (
    <Button
    style= {{"background": "green", "color": "white"}}
      variant="contained"
      color="primary"
      {...props}
      tabIndex="0"
    >
      ACCEPT
    </Button>
  );
}

export default AcceptBtn;
