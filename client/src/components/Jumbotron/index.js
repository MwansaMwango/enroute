import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: "12vh",
        clear: "both",
        paddingTop: "1rem",
        fontSize: "1rem",
        textAlign: "center",
        color: "white",
        
        // https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=250&q=80)
        // https://images.unsplash.com/photo-1533027052290-2b4ece075c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80
        // https://images.unsplash.com/photo-1560532806-dbb46d88b494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .6)),
          url(
            https://images.unsplash.com/photo-1560532806-dbb46d88b494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)

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
