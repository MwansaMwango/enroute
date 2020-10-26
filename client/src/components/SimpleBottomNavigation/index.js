import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MessageIcon from "@material-ui/icons/Message";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Grid } from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiBottomNavigationAction-root": {
      margin: "0",
      padding: "0",
    },
  },
});

export default function SimpleBottomNavigation() {
 
  const history = useHistory();
  let currentPage = history.location.pathname;
  const [value, setValue] = React.useState(currentPage);
  const classes = useStyles();
  
  return (
    <AppBar position="fixed" color="primary" style={{ top: "auto", bottom: 0 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          history.push(newValue);
          setValue(newValue);
         }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Drive"
          icon={<LocalTaxiIcon />}
          // href="/drive"
          value="/drive"
        />

        <BottomNavigationAction
          label="My Trips"
          icon={<PersonPinCircleIcon />}
          // href="/mytrips"
          value="/mytrips"
        />

        <BottomNavigationAction
          label="Ride"
          icon={<EmojiPeopleRoundedIcon />}
          // href="/ride"
          value="/ride"
        />

        <BottomNavigationAction
          label="My Requests"
          icon={<AirlineSeatReclineNormalIcon />}
          // href="/myrequests"
          value="/myrequests"
        />

        <BottomNavigationAction
          label="Feed"
          icon={<MessageIcon />}
          // href="/newsfeed"
          value="/newsfeed"
        />
      </BottomNavigation>
    </AppBar>
  );
}
