import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        paddingTop: "5px",
        paddingBottom: "5px",
        fontSize: "1rem",
        color: "white",
        backgroundColor: "#FAD961",
        backgroundImage: "linear-gradient(0deg, #FAD961 0%, #E64500 100%)",
        filter: "drop-shadow(3px 3px 3px rgba(240,100,0.3))",
        alignItems: "center",
        borderRadius: "0 0 50px 50px",
 
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
