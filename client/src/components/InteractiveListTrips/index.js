import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import Button from "@material-ui/core/Button";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import PhoneIcon from "@material-ui/icons/Phone";
import CancelIcon from "@material-ui/icons/Cancel";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import moment from "moment";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import HistoryIcon from "@material-ui/icons/History";
import LocalTaxiRoundedIcon from "@material-ui/icons/LocalTaxiRounded";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import EditIcon from "@material-ui/icons/Edit";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400, // limits display across very wide screens / desktops
    minWidth: 280,
    width: "95vw",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderRadius: theme.spacing(3),

    "& svg": {
      margin: theme.spacing(0.25),
      "& hr": {},
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  },

  dropdown: {
    position: "absolute",
    top: 60,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    borderRadius: theme.spacing(3),
    overflowWrap: "breakWord",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveListTrips({
  props,
  deleteTrip,
  updateTrip,
}) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);
  let phoneLink = "tel:" + props.user_id.phone;
  let smsLink = "sms:" + props.user_id.phone;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <List>
      <Grid container justify="center" direction="column" alignItems="center">
        {generate(
          <div className={classes.root}>
            <ListItem>
              {/* <ListItemAvatar>
                <Avatar>
                  <LocalTaxiRoundedIcon />
                </Avatar>
              </ListItemAvatar> */}

              {/* <Divider variant="middle" /> */}

              <ListItemText
                primary={
                  <Grid container alignItems="center">
                    <MyLocationIcon />
                    {props.from}
                  </Grid>
                }
                secondary={
                  <Grid container alignItems="center">
                    <LocationOnIcon />
                    {props.to}
                  </Grid>
                }
              />

              <ListItemText
                primary={moment(props.departDate).format("DD MMM")}
                secondary={props.departTime}
              />
              <ListItemText
                primary="Status"
                secondary={props.request_id ? "Confirmed" : "Pending"}
              />

              <Link to={"/trips/" + props._id}>
                <FindInPageIcon fontSize="large" />
              </Link>

              {/* <Divider variant="middle" /> */}

              <Grid direction="row" justify="center" alignItems="center">
                <ClickAwayListener onClickAway={handleClickAway}>
                  <span>
                    {open ? (
                      <ExpandLess fontSize="large" onClick={handleClick} />
                    ) : (
                      <ExpandMore fontSize="large" onClick={handleClick} />
                    )}

                    {open ? (
                      <div className={classes.dropdown}>
                        <Typography>
                          <Grid
                            direction="row"
                            container
                            justify="space-around"
                            alignItems="center"
                          >
                            <b>Other Details</b>
                            {/*TODO Link to edit trip data*/}
                            <EditIcon
                              color="#259CBB" // cyan
                              fontSize="large"
                              onClick={() => updateTrip(props._id, props)}
                            />
                            <DeleteForeverIcon
                              color="#2222"
                              fontSize="large"
                              onClick={() => deleteTrip(props._id)}
                            />
                          </Grid>
                          <hr />
                          Trips Note:{" "}
                          {props.tripNote ? (
                            <Typography
                              fontStyle="oblique"
                              fontFamily="Monospace"
                            >
                              {props.tripNote}{" "}
                            </Typography>
                          ) : (
                            "None"
                          )}{" "}
                          <br />
                          Seats required:{" "}
                          {props.freeSeats
                            ? "  " + props.freeSeats
                            : "None"}{" "}
                          <br />
                          Carry package?: {props.carryPackage
                            ? " Yes"
                            : "No"}{" "}
                          <br />
                        </Typography>
                      </div>
                    ) : null}
                  </span>
                </ClickAwayListener>
              </Grid>
            </ListItem>
          </div>
        )}
      </Grid>
    </List>
  );
}
