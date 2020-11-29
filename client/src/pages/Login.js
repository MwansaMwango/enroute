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

import { Grow, Fade } from "@material-ui/core";

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
    maxWidth: "80%",
    padding: "20px 20px 0 20px",
  },
  typography: {
    fontFamily: "Montserrat",
    color: "#E64500",
    padding: 10,
  },
});

function Login() {
  const history = useHistory();

  const classes = useStyles();

  const [errors, setErrors] = useState([]);

  const [payload, setPayload] = useState({});

  const handleChange = async (event) => {
    const type = event.target.name;

    // payload looks like: {
    //     email: '',
    //     password: '',
    // }
    setPayload({
      ...payload,
      [type]: event.target.value, // dynamically set the type of payload
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // call api to login

    const response = await axios
      .post(
        "/api/auth/login",
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        window.location.href = "/drive";
        // history.push("/drive"); // history does not refresh page
      })
      .catch((err) => {
        // not authenticated
        console.log(err.response);
        if (err.response.data.errors) {
          const errorMsg = err.response.data.errors.map((err) => err.msg);
          // failed to register
          setErrors([...errorMsg]);
        } else {
          setErrors(["Whoops please enter your credentials"]);
        }
      });
  };

  return (
    <Fade in="true" timeout={{ enter: 5000, exit: 2000 }}>
      <Box
        style={{
          position: "fixed",

          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url("https://images.unsplash.com/photo-1482029255085-35a4a48b7084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=50")
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Container maxWidth="xs">
          <Card style={{ marginTop: 50 }} className={classes.root}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <img
                src={require("../assets/siterider-logo-color.svg")}
                className={classes.img}
              />
            </Grid>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
            >
              <Typography
                variant="subtitle"
                className={classes.typography}
                component="h6"
              >
                Transport people, parcels and vehicles between sites
              </Typography>
            </Grid>
            <CardContent className={classes.typography}>
              <form onSubmit={onSubmit}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      name="email"
                      label="Email"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      name="password"
                      type="password"
                      label="Password"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </form>
              <article>
                {errors.map((error) => (
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="nowrap"
                  >
                    <Typography
                      className={classes.error}
                      key={error}
                      variant="caption"
                      display="block"
                    >
                      {error}
                    </Typography>
                  </Grid>
                ))}
              </article>
            </CardContent>
            <CardActions>
              <Grid container justify="flex-end" alignItems="flex-end">
                <Button
                  onClick={onSubmit}
                  size="small"
                  className={classes.typography}
                >
                  Login
                </Button>

                <Button
                  onClick={() => history.push("/register")}
                  size="small"
                  className={classes.typography}
                >
                  SignUp
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </Fade>
  );
}

export default Login;
