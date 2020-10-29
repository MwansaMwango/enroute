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
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

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

export default function InteractiveListRequests({ props, deleteRequest }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let phoneLink;
  if (props.driver_id) {
    phoneLink = "tel:" + props.driver_id.phone;
  } else {
    phoneLink = "tel:" + "";
  }

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
              <ListItemText
                primary={
                  <Grid container alignItems="center">
                    <MyLocationIcon color="primary" />
                    <Typography
              
                      className={classes.typography}
                    >
                      {props.from}
                    </Typography>
                  </Grid>
                }
                secondary={
                  <Grid container alignItems="center">
                    <LocationOnIcon color="primary" />
                    <Typography
                
                      className={classes.typography}
                    >
                      {props.to}
                    </Typography>
                  </Grid>
                }
              />

              {/* <ListItemText primary="Status" secondary={props.status} /> */}

              <ListItemText
                primary={
                  <Typography
          
                    className={classes.typography}
                  >
                    {moment(props.departDate).format("DD MMM")}
                  </Typography>
                }
                secondary={
                  <Typography
                    // variant="p"
                    // component="h5"
                    className={classes.typography}
                  >
                    {props.departTime}
                  </Typography>
                }
              />

              {(() => {
                switch (props.status) {
                  case "Pending":
                    return (
                      <Grid
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          onClick={
                            () => handleClickDeleteRequest() // TODO delete request modal
                          }
                          startIcon={<DeleteIcon color="disabled" />}
                          style={{width: "100px", marginBottom: "5px", padding: "2px", borderRadius: "20px"}}
                        >
                          DELETE
                        </Button>

                        {/* <DeleteIcon
                          color="disabled"
                          fontSize="large"
                          onClick={
                            () => handleClickDeleteRequest() // TODO delete request modal
                          }
                        /> */}

                        <TransitionsModalRequest
                          requestData={props}
                          editClicked={true}
                        
                        />
                      </Grid>
                    );

                  case "Booked":
                    return (
                      <Grid
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
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
                                <Typography className={classes.typography}>
                                  <strong>More Details</strong>
                                  <hr />
                                  Request Note:{" "}
                                  {props.requestNote ? (
                                    <Typography
                                      fontStyle="oblique"
                                      className={classes.typography}
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
