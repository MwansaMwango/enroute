import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import MessageIcon from "@material-ui/icons/Message";
import PhoneIcon from "@material-ui/icons/Phone";
import moment from "moment";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345, // limits display across very wide screens / desktops
    minWidth: 280,
    width: "95vw",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(3),
    backgroundColor: "white",
    boxShadow: "5px 5px 5px #8888",

    "& svg": {
      margin: theme.spacing(0.1),
      "& hr": {},
    },
  },

  dropdown: {
    position: "absolute",
    top: 60,
    right: 0,
    left: 0,
    zIndex: 10,
    border: "1px solid",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    borderRadius: theme.spacing(3),
    overflowWrap: "breakWord",
    fontFamily: "Montserrat",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },

  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  typography: {
    fontFamily: "Montserrat",
  },
}));

function generate(element) {
  return [0].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveListMatches({
  props,
  undoAcceptRequest,
  acceptRequest,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let phoneLink = "tel:" + props.user_id.phone;
  let smsLink = "sms:" + props.user_id.phone;
  let tempTrip_id = props.trip_id;

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
              <ListItemAvatar>
                {props.status === "Booked" ? (
                  <Avatar
                    src={require("../../assets/avatar-mine-worker.png")}
                    className={classes.large}
                  />
                ) : (
                  // <AccountBoxRoundedIcon /> // TODO adopt User's avator

                  <Avatar className={classes.large}>
                    <EmojiPeopleRoundedIcon />
                  </Avatar>
                )}
              </ListItemAvatar>

              <ListItemText
                style={{ marginRight: 5 }}
                primary={
                  <Typography
                    variant="p"
                    component="h5"
                    classes={classes.typography}
                  >
                    {props.status === "Booked"
                      ? " " + props.user_id.firstName
                      : "1 Rider"}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="p"
                    component="h5"
                    classes={classes.typography}
                  >
                    {props.status === "Booked" ? props.user_id.lastName : ""}
                  </Typography>
                }
              />

              <div style={{ marginRight: 5 }}>
                <ListItemText
                  primary={
                    <Grid container alignItems="center">
                      <EmojiEventsIcon color="primary" />
                    </Grid>
                  }
                  secondary={
                    <Grid container alignItems="center">
                      10pts
                    </Grid>
                  }
                />
              </div>
              <div style={{ marginRight: 5 }}>
                <ListItemText
                  primary={
                    <Grid container alignItems="center">
                      <ScheduleIcon color="primary" />
                    </Grid>
                  }
                  secondary={
                    <Grid container alignItems="center">
                      {props.departTime}
                    </Grid>
                  }
                />
              </div>

              {/* <ListItemText
                primary={<AirlineSeatReclineNormalIcon color="primary" />}
                secondary={props.seatsRequired}
              /> */}

              {/* Dynamic Action Buttons */}

              {(() => {
                switch (props.status) {
                  case "Pending":
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          acceptRequest(props._id, { trip_id: tempTrip_id });
                        }}
                        startIcon={<CheckCircleIcon />}
                      >
                        Accept
                      </Button>
                    );
                }
              })()}

              {/* </ListItem> */}

              {/* <ListItemText
                primary={<AirlineSeatReclineNormalIcon color="primary" />}
                secondary={props.seatsRequired}
              /> */}

              {(() => {
                switch (props.status) {
                  case "Booked":
                    return (
                      // <Grid
                      // container
                      //   direction="row"
                      //   justify="center"
                      //   alignItems="center"
                      // >
                      <div>
                        <IconButton size="small">
                          <CancelIcon
                            color="disabled"
                            fontSize="large"
                            onClick={() =>
                              undoAcceptRequest(props._id, {
                                trip_id: tempTrip_id,
                              })
                            }
                          />
                        </IconButton>
                        <IconButton size="small">
                          <a href={phoneLink}>
                            <PhoneIcon color="secondary" fontSize="large" />
                          </a>
                        </IconButton>
                        {/* <IconButton size="small">
                            <a href={smsLink}>
                              <MessageIcon color="secondary" fontSize="large" />
                            </a>
                          </IconButton> */}
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <span>
                            {open ? (
                              <IconButton size="small">
                                <ExpandLess
                                  fontSize="1.2rem"
                                  onClick={handleClick}
                                />
                              </IconButton>
                            ) : (
                              <IconButton size="small">
                                <ExpandMore
                                  fontSize="1.2rem"
                                  onClick={handleClick}
                                />
                              </IconButton>
                            )}

                            {open ? (
                              <div className={classes.dropdown}>
                                {/* Click me, I will stay visible until you click
                                outside. */}
                                <Typography>
                                  <strong>More details</strong>
                                  <hr />
                                  Request Note:{" "}
                                  {props.requestNote ? (
                                    <Typography
                                      fontStyle="oblique"
                                     
                                    >
                                      {props.requestNote}{" "}
                                    </Typography>
                                  ) : (
                                    "None"
                                  )}{" "}
                                  <br />
                                  Seats required:{" "}
                                  {props.seatsRequired
                                    ? "  " + props.seatsRequired
                                    : "None"}{" "}
                                  <br />
                                  Has a pacakge?:{" "}
                                  {props.hasPackage ? " Yes" : "No"} <br />
                                </Typography>
                              </div>
                            ) : null}
                          </span>
                        </ClickAwayListener>
                        {/* </Grid> */}
                      </div>
                    );
                }
              })()}
            </ListItem>
          </div>
        )}
      </Grid>
    </List>
  );
}
