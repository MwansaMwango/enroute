import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core/";
export default function Layout(props) {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("current-user") === undefined) {
      setIsLoading(false);
      return history.push("/");
    }

    Axios.get("/api/users/current-user")
      .then((res) => {
        setIsLoading(false);
        sessionStorage.setItem("current-user", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        setIsLoading(false);

        return history.push("/");
      });
  }, []);

  return (
    <main>
      {isLoading ? (
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{marginTop: "50vh", color:"#E64500"}}
        >
          Loading....<br/>
          <CircularProgress  />
        </Grid>
      ) : (
        props.children
      )}
    </main>
  );
}
