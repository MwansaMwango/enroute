import React from "react";
// import ReactDOM from 'react-dom'
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid } from "@material-ui/core/";

import {
  makeStyles,
  // ThemeProvider,
  // createMuiTheme,
} from "@material-ui/core/styles";
// import { Animated } from "react-animated-css";
import "./style.scss";

const useStyles = makeStyles({
  root: {
    transform: "rotateZ(-45deg)",
  },
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    fontSize: "3vw",
    right: 0,
    top: 10,
    border: `0.2vw solid ${theme.palette.background.paper}`,
    padding: "1.7vw 1vw",
    borderRadius: "50%",
  },
}))(Badge);

const getRandomInt = (max) => {
  // random number for random floateffect to applied to each element
  return Math.floor(Math.random() * Math.floor(max)) + 1;
};

export default function CustomizedBadges(props) {
  const classes = useStyles();
  return (
    // <Grid container direction="row" justify="space-around" alignItems="center" >

    <div>
      <Typography
        variant="h5"
        component="h5"
        className={"floatEffect-" + getRandomInt(4)}
      >
        {/* <LocationOnIcon color="primary" fontSize="large" /> */}
        {/* {props.fromLocation} */}

        <IconButton aria-label="ride">
          <StyledBadge badgeContent={props.totalRequests} color="secondary">
            <EmojiPeopleRoundedIcon style={{ fontSize: "6vw" }} />
          </StyledBadge>
        </IconButton>
      </Typography>
    </div>
    /* </Grid> */
  );

  // ------------ close ------------------------
}
