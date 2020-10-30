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
import isEmpty from "lodash/isEmpty";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
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

function Register() {
  const history = useHistory();

  const classes = useStyles();

  const [errors, setErrors] = useState([]);

  const [payload, setPayload] = useState({});

  const handleChange = async (event) => {
    const name = event.target.name;

    // payload looks like: {
    //     email: '',
    //     password: '',
    //     password_again: ''
    // }
    setPayload({
      ...payload,
      [name]: event.target.value, // dynamically set the type of payload
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // check if password submitted are the same
    if (payload.password !== payload.password_again) {
      return setErrors(["Passwords do not match!"]);
    }

    // call api to login
    const response = axios
      .post("/api/auth/register", payload, {
        withCredentials: true,
      })
      .then((res) => {
        history.push("/drive");
      })
      .catch((err) => {
        console.log(err.response);
        const errorMsg = err.response.data.errors.map((err) => err.msg);
        // failed to register
        setErrors([...errorMsg]);
      });
  };

  return (
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
        <Card style={{ marginTop: 10 }} className={classes.root}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <img
              src={require("../assets/undraw-register.svg")}
              className={classes.img}
            />
            <Typography variant="h4" className={classes.typography}>
              Sign Up
            </Typography>
          </Grid>
          <CardContent className={classes.typography}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    type="text"
                    name="firstName"
                    label="First Name"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    type="text"
                    name="lastName"
                    label="Last Name"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <PhoneEnabledIcon />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    type="phone"
                    name="phone"
                    label="Phone"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <AlternateEmailIcon />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    type="email"
                    name="email"
                    label="Email"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <LockIcon />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    name="password"
                    type="password"
                    label="Password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <LockIcon />
                </Grid>
                <Grid item>
                  <TextField
                    onChange={handleChange}
                    id="input-with-icon-grid"
                    name="password_again"
                    type="password"
                    label="Password Again"
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
                Submit
              </Button>
              <Button
                onClick={() => history.push("/login")}
                size="small"
                className={classes.typography}
              >
                Login
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;
