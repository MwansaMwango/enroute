import React from "react";




function Jumbotron({ children }) {
  return (
    <div

      style={{
        // height: "12vh",
        clear: "both",
        paddingTop: "10px",
        paddingBottom: "5px",
        fontSize: "1.2rem",
        textAlign: "center",
        color: "white",
        backgroundColor: '#FAD961',
        backgroundImage: 'linear-gradient(0deg, #FAD961 0%, #e64500 100%)',
           
        // borderStyle: 'solid',
        // borderSize: '2px',
        // borderColor: '25px',
        borderRadius: '0 0 50px 50px',
        // marginBottom: "10px",
        
        // https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&h=250&q=80)
        // https://images.unsplash.com/photo-1533027052290-2b4ece075c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80
        // https://images.unsplash.com/photo-1560532806-dbb46d88b494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
        // backgroundImage: ` linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, .6)),
        //   url(
        //     https://images.unsplash.com/photo-1560532806-dbb46d88b494?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)

        //     `,
          backgroundSize: "cover", // '100%' scales full image unlike 'cover' test
        backgroundRepeat: "no-repeat",
      }}

      className="jumbotron"
    >
 
      {children}
    </div>
  );
}

export default Jumbotron;
