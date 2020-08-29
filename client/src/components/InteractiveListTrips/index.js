import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TransitionsModalTrips from "../TransitionsModalTrips";
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

export default function InteractiveListTrips({ props, deleteTrip }) {
  const textFieldRef = React.createRef();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = (e) => { // TODO fix known bug of Muiselect triggering clickAwayListener
    
    if (
   
      e.target
    ) {
      e.target.focus();
    
      return;
    }
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

              <ClickAwayListener onClickAway={handleClickAway}>
                <span>
                  <Grid direction="row" justify="center" alignItems="center">
                    {open ? (
                      <IconButton>
                        <ExpandLess fontSize="large" onClick={handleClick} />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <ExpandMore fontSize="large" onClick={handleClick} />
                      </IconButton>
                    )}
                    {open ? (
                      <div className={classes.dropdown}>
                        <Typography>
                          <Grid
                            direction="row"
                            container
                            justify="space-between"
                            alignItems="center"
                          >
                            <h3>
                              <b>Other Details</b>
                            </h3>
                            {/*TODO Link to edit trip data*/}

                            <TransitionsModalTrips
                              id="transitionsModalTrips"
                              inputRef={textFieldRef}
                              tripData={props}
                              editClicked={true}
                            />

                            <IconButton>
                              <DeleteForeverIcon
                                color="#2222"
                                fontSize="large"
                                onClick={() => deleteTrip(props._id)}
                              />
                            </IconButton>
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
                    ) : (
                      ""
                    )}
                  </Grid>
                </span>
              </ClickAwayListener>
            </ListItem>
          </div>
        )}
      </Grid>
    </List>
  );
}
