import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },

  media: {
    height: "100vh",
  },
  error: {
    color: "#EF5350",
  },
  img: {
    maxWidth: "50%",
    padding: 10,
  },
  typography: {
    fontFamily: "Montserrat",
    color: "#E64500",
  },
});

function Intro() {
  const history = useHistory();

  const classes = useStyles();

  return (
    <Box
      style={{
        position: "fixed",

        // backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        //   url("https://images.unsplash.com/photo-1482029255085-35a4a48b7084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=50")
        //   `,
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        backgroundColor: "#E64500",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Container maxWidth="xs">
        <Card style={{ marginTop: 50 }} className={classes.root}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img
              src={require("../assets/siterider-logo-white.svg")}
              className={classes.img}
            />
          </Grid>
          <CardContent className={classes.typography}>
            <Typography variant="h4" className={classes.typography}>
              Transport people, parcels and vehicles between sites
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container justify="flex-end" alignItems="flex-end">
              <Button
                onClick={() => history.push("/register")}
                size="small"
                className={classes.typography}
              >
                Get Started
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

export default Intro;
