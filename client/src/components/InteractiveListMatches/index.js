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
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400, // limits display across very wide screens / desktops
    minWidth: 280,
    width: "95vw",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(3),
    backgroundColor: "white",
    boxShadow: "5px 5px 5px #8888",

    "& svg": {
      margin: theme.spacing(0.25),
      "& hr": {},
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: "Montserrat",
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
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
  const [] = React.useState(false);
  const [] = React.useState(true);
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
                  <Avatar src={require("../../assets/avatar-mine-worker.png")} className={classes.large}/>
                ) : (
                  // <AccountBoxRoundedIcon /> // TODO adopt User's avator

                  <Avatar>
                    <EmojiPeopleRoundedIcon />
                  </Avatar>
                )}
              </ListItemAvatar>

              <ListItemText className={classes.heading}
                primary=
                
                {
                  props.status === "Booked" ? (
                    <b>
                      {" "}
                      {props.user_id.firstName +
                        " " +
                        props.user_id.lastName}{" "}
                    </b>
                  ) : (
                    "1 Rider"
                  )
                }
                secondary={
                  props.status === "Booked" ? (
                    <a href={phoneLink}>
                      <Grid container alignItems="center">
                        {/* <PhoneIcon size="small" /> */}
                        {props.user_id.phone}
                      </Grid>
                    </a>
                  ) : (
                    props.status
                  )
                }
              />
              {/* <Divider variant="middle" /> */}

              <ListItemText primary="Pts" secondary="10" />

              <ListItemText
                primary={moment(props.departDate).format("DD MMM")}
                secondary={props.departTime}
              />
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
                        fontSize=""
                      >
                        Accept
                      </Button>
                    );

                  case "Booked":
                    return (
                      <Grid
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
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
                          <a href={smsLink}>
                            <MessageIcon color="secondary" fontSize="large" />
                          </a>
                        </IconButton>
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <span>
                            {open ? (
                              <IconButton size="small">
                                <ExpandLess
                                  fontSize="large"
                                  onClick={handleClick}
                                />
                              </IconButton>
                            ) : (
                              <IconButton size="small">
                                <ExpandMore
                                  fontSize="large"
                                  onClick={handleClick}
                                />
                              </IconButton>
                            )}

                            {open ? (
                              <div className={classes.dropdown}>
                                {/* Click me, I will stay visible until you click
                                outside. */}
                                <Typography>
                                  <strong>Other Details</strong>
                                  <hr />
                                  Request Note:{" "}
                                  {props.requestNote ? (
                                    <Typography
                                      fontStyle="oblique"
                                      fontFamily="Monospace"
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
                      </Grid>
                    );
                }
              })()}
            </ListItem>
            <ListItemText primary="Seats"/>
            <ListItemText primary="Notes"/>
            <ListItemText primary="Parcel"/>
          </div>
        )}
      </Grid>
    </List>

  );
}
