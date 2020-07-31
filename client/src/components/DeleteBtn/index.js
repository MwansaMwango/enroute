import React from "react";
import "./style.css";
import { Button } from "@material-ui/core";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <Button
    style= {{"background": "grey", "color": "white", "margin":"10px"}}
      variant="contained"

      color="primary"
      {...props}
      tabIndex="0"
    >
      DELETE
    </Button>
  );
}

export default DeleteBtn;
