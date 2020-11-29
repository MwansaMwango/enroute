import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core/";
import Intro from "../components/Intro";
import  { Redirect } from 'react-router-dom'

export default function Layout(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [enableSplashScreen, setEnableSplashScreen] = useState(false);

  const showIntro = () => {
    console.log("Running show intro");
    return () => <Intro />;
  };

  useEffect(() => {
    if (sessionStorage.getItem("current-user") === undefined) {
      // return <Intro/>
      setIsLoading(false);
      // return history.push("/");
    }

    Axios.get("/api/users/current-user")
      .then((res) => {
        setIsLoading(false);
        sessionStorage.setItem("current-user", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        setIsLoading(false);
        //Enable splash screen for period of seconds
        setEnableSplashScreen(true);
        // Wait x seconds before moving to "/"
        const timer = setTimeout(() => {
          setEnableSplashScreen(false); // remove splashscreen
          return <Redirect to='/login'  />
          // history.push("/login"); // navigate to login screen
        }, 3000);
        return () => clearTimeout(timer);
      });
  }, []);

  return (
    <main>
      {enableSplashScreen ? <Intro /> : null}
      {isLoading ? (
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{ marginTop: "50vh", color: "#E64500", fontSize: "1.2rem" }}
        >
          Loading...
          <br />
          <CircularProgress style={{ color: "#E64500" }} />
        </Grid>
      ) : (
        props.children
      )}
    </main>
  );
}
