import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import PhoneIcon from "@material-ui/icons/Phone";
import moment from "moment";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import API from "../../utils/API";
import TransitionsModalRequest from "../TransitionsModalRequest";

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

export default function InteractiveListRequests({
  props,
  deleteRequest,
  
}) {
  const classes = useStyles();
 

  const [open, setOpen] = React.useState(false);
  let phoneLink = "tel:" + "" || props.driver_id.phone;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickDeleteRequest = () => {
    deleteRequest(props._id);
  };

  return (
    <List>
      <Grid container justify="center" direction="column" alignItems="center">
        {generate(
          <div className={classes.root}>
            <ListItem>
              {/* <ListItemAvatar>
                <Avatar>
                  {props.status === "Confirmed" ? (
                    <AccountBoxRoundedIcon /> // TODO adopt Drivers avator
                  ) : (
                    <EmojiPeopleRoundedIcon />
                  )}
                </Avatar>
              </ListItemAvatar> */}

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

              {/* <ListItemText primary="Status" secondary={props.status} /> */}

              <ListItemText
                primary={moment(props.departDate).format("DD MMM")}
                secondary={props.departTime}
              />

              {/* <Divider variant="middle" /> */}
              {(() => {
                switch (props.status) {
                  case "Pending":
                    return (
                      <Grid
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <TransitionsModalRequest
                          requestData={props}
                          editClicked={true}
                        />
                      </Grid>
                    );

                  case "Confirmed":
                    return (
                      <Grid
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <DeleteIcon
                          color="disabled"
                          fontSize="large"
                          onClick={
                            () => handleClickDeleteRequest() // TODO delete request
                          }
                        />

                        <a href={phoneLink}>
                          <PhoneIcon color="secondary" fontSize="large" />
                        </a>

                        <ClickAwayListener onClickAway={handleClickAway}>
                          <span>
                            {open ? (
                              <ExpandLess
                                fontSize="large"
                                onClick={handleClick}
                              />
                            ) : (
                              <ExpandMore
                                fontSize="large"
                                onClick={handleClick}
                              />
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
          </div>
        )}
      </Grid>
    </List>
  );
}
