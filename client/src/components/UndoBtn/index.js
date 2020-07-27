import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function UndoBtn(props) {
  return (
    <button className="delete-btn btn" {...props} tabIndex="0">
      UNDO
    </button>
  );
}

export default UndoBtn;
