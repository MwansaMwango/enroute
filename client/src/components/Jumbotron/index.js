import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: "15vh",
        clear: "both",
        paddingTop: "1rem",
        fontSize: "1rem",
        textAlign: "center",
        color: "white",
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=250&q=80)
          `,
          backgroundSize: "cover", // '100%' scales full image unlike 'cover'
        backgroundRepeat: "no-repeat",
      }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
