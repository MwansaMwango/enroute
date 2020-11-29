import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },

  media: {
    height: "100vh",
  },
  error: {
    color: "#EF5350",
  },
  businessLogo: {
    maxWidth: 250,
    marginTop: "150px",
    zIndex: 300,
  },
  appLogo: {
    maxWidth: 300,
    zIndex: 300,
    paddingTop: 30,
  },
  introAnimation: {
    maxWidth: 200,
    zIndex: 300,
    paddingTop: 30,
  },
  typography: {
    fontFamily: "Montserrat",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
  },
  btn: {
    fontFamily: "Montserrat",
    color: "white",
    backgroundColor: "#259CBB",
    marginTop: 50,
    // justifyContent: "center"
  },

}));

function Intro() {
  console.log("search=", window.location.search);
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box
      style={{
        // position: "fixed",

        // backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        //   url("https://images.unsplash.com/photo-1482029255085-35a4a48b7084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=50")
        //   `,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        backgroundColor: "#E64500",
        height: "100vh",
        width: "100vw",
        zIndex: 290,
      }}
    >
      <Fade in="true" timeout={{enter: 2000, exit: 2000}}>
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          // wrap="nowrap"
          className={classes.splash}
        >
          <img
            src={require("../../assets/bhp-logo-white.svg")}
            className={classes.businessLogo}
          />
          <img
            src={require("../../assets/siterider-logo-white.svg")}
            className={classes.appLogo}
          />
          <img
            src={require("../../assets/directions.gif")}
            className={classes.introAnimation}
          />
          <Grid container direction="column" justify="center" spacing={1}>
            <Typography variant="body1" className={classes.typography}>
              Optimising transport between remote site operations
            </Typography>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}

export default Intro;
