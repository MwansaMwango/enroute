import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Drive"
        icon={<LocalTaxiIcon />}
        href="/drive"
      />

      <BottomNavigationAction
        label="My Trips"
        icon={<PersonPinCircleIcon />}
        href="/myTrips"
      />
      <BottomNavigationAction
        label="My Requests"
        icon={<AirlineSeatReclineNormalIcon />}
        href="/myrequests"
      />
      <BottomNavigationAction
        label="Newsfeed"
        icon={<MessageIcon />}
        href="/newsfeed"
      />
    </BottomNavigation>
  );
}
