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
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import API from "../../utils/API";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import FlagIcon from "@material-ui/icons/Flag";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

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
      margin: theme.spacing(0.1)
    },

      "& .MuiIconButton-root": {
        padding: "0"
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
    // fontSize: "0.8rem"
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

  const handleUpdateTripStatus = (newStatus) => {
    props.status = newStatus;
    console.log("trip data updated props", props);
    API.updateTrip(props._id, props)
      .then(function (res) {
        alert(JSON.stringify("Updated trip status.", res.data));
        window.location.reload(); //refresh page
      })
      .catch((err) => console.log(err));
  };

  const handleClickAway = (e) => {
    // TODO fix known bug of Muiselect triggering clickAwayListener
    if (e.target) {
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
              <ListItemText
                primary={
                  <Grid container alignItems="center">
                    <MyLocationIcon color="primary" fontSize="1rem" />
                    <Typography className={classes.typography} variant="p">
                      {props.from}
                    </Typography>
                  </Grid>
                }
                secondary={
                  <Grid container alignItems="center">
                      <LocationOnIcon color="primary" />
                    <Typography className={classes.typography} variant="p" component="p">
                    {props.to}
                    </Typography>
                  </Grid>
                }
              />

              <ListItemText
                primary={
                  <Typography className={classes.typography} variant="p" component="p" style={{fontSize:"0.8rem"}}>
                    {moment(props.departDate).format("DD MMM")}
                  </Typography>
                }
                secondary={
                  <Typography className={classes.typography} variant="p" style={{fontSize:"0.8rem"}}>
                    {props.departTime}
                  </Typography>
                }
              />

              <ListItemText
                primary={
                  <Typography className={classes.typography} >Status</Typography>
                }
                secondary={
                  <Typography className={classes.typography} style={{fontSize:"0.7rem"}} color="secondary">
                    {props.status}
                  </Typography>
                }
              />
              {/* TODO use set state for status or seperate if ternary renders*/}

              {props.status === "Booked" ? (
                <IconButton size="small">
                  <PlayCircleFilledIcon
                    fontSize="medium"
                    color="secondary"
                    onClick={() => {
                      handleUpdateTripStatus("Started");
                      
                    }}
                  />
                </IconButton>
              ) : props.status === "Started" ? (
                <IconButton size="small">
                  <DoneAllIcon
                    fontSize="medium"
                    color="dark"
                    onClick={() => {
                      handleUpdateTripStatus("Completed");
                    }}
                  />
                </IconButton>
              ) : props.status === "Completed" ? (
                <ListItemText
                  primary={
                    <IconButton size="small">
                      <EmojiEventsIcon fontSize="medium" color="light" />
                    </IconButton>
                  }
                  secondary="10Pts" // TODO - change from hard coded points to points determined by distance travelled etc
                />
              ) : (
                <Link to={"/trips/" + props._id}>
                  <FindInPageIcon fontSize="large" color="secondary" />
                </Link>
              )}

              <ClickAwayListener onClickAway={handleClickAway}>
                <span>
                  <Grid direction="row" justify="center" alignItems="center">
                    {open ? (
                      <IconButton>
                        <ExpandLess fontSize="medium" onClick={handleClick} />
                      </IconButton>
                    ) : (
                      <IconButton>
                        <ExpandMore fontSize="medium" onClick={handleClick} />
                      </IconButton>
                    )}
                    {open ? (
                      <div className={classes.dropdown}>
                        <Typography className={classes.typography}>
                          <Grid
                            direction="row"
                            container
                            justify="space-between"
                            alignItems="center"
                          >
                            <Typography className={classes.typography}>
                              <strong>More Details</strong>
                            </Typography>
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
                          Trip note:{" "}
                          {props.tripNote ? props.tripNote + " " : "None"}{" "}
                          <br />
                          Free seats:{" "}
                          {props.freeSeats
                            ? "  " + props.freeSeats
                            : "None"}{" "}
                          <br />
                          Carry package? {props.carryPackage
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
