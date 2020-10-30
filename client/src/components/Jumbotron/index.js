import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "1rem",
        color: "white",
        backgroundColor: "#FAD961",
        backgroundImage: "linear-gradient(0deg, #FAD961 0%, #E64500 100%)",
        filter: "drop-shadow(3px 3px 3px rgba(240,100,0.3))",
        alignItems: "center",
        borderRadius: "0 0 20px 20px",
 
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
