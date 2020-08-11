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

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 752,
    // width: "fit-content",
    width: "100vw",

    // marginBottom: theme.spacing(0.5),
    border: `2px solid ${theme.palette.divider}`,
    // borderRadius: theme.shape.borderRadius,
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    // marginBottom: theme.spacing(1),

    "& svg": {
      margin: theme.spacing(0.25),
      "& hr": {
        margin: theme.spacing(0.25),
      },
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
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

export default function InteractiveList({
  props,
  undoAcceptRequest,
  acceptRequest,
}) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(true);

  return (
    <div>
      {/* <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          }
          label="Enable dense" */}
      {/* /> */}
      {/* <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={(event) => setSecondary(event.target.checked)}
            />
          }
          label="Enable secondary text"
        /> */}
      {/* </FormGroup> */}
      <Grid container alignItems="center" justify="center">
        {/* <Grid item xs={12} md={12}> */}
        {/* <Typography variant="h6" className={classes.title}>
            Matching Rides
          </Typography> */}
        {/* <div className={classes.demo}> */}
        {/* <List> */}
          {generate(
            <div className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {props.status === "Confirmed" ? (
                      <AccountBoxRoundedIcon />
                    ) : (
                      <NotificationsActiveIcon />
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    props.status === "Confirmed"
                      ? props.user_id.firstName + " " + props.user_id.lastName
                      : "1 Rider"
                  }
                  secondary={
                    props.status === "Confirmed"
                      ? props.user_id.phone
                      : props.status
                  }
                />
                <Divider variant="middle" />

                <ListItemText
                  primary="20" // hard coded for MVP
                  secondary="pts"
                />

                <Divider variant="middle" />

                <ListItemText
                  primary={moment(props.departDate).format("DD MMM")}
                  secondary={props.departTime}
                />

                {/* <Divider orientation="vertical" flexItem /> */}

                {/* <ListItemSecondaryAction> */}
                {/* <Grid container alignItems="center" justify="center"> */}
                {/* <IconButton edge="end" aria-label="Delete">
                    <CancelIcon color="secondary" fontSize="large" />
                  </IconButton>
                  {}
                  <IconButton edge="end" aria-label="Accept">
                    <CheckCircleIcon color="primary" fontSize="large" />
                  </IconButton> */}

                {(() => {
                  switch (props.status) {
                    case "Pending":
                      return (
                        <IconButton edge="end" aria-label="Accept">
                          <CheckCircleIcon
                            color="primary"
                            fontSize="large"
                            onClick={() => {
                              acceptRequest(props._id);
                            }}
                          />
                        </IconButton>
                      );

                    case "Confirmed":
                      return (
                        <IconButton edge="end" aria-label="Cancel">
                          <CancelIcon
                            color="error"
                            fontSize="large"
                            onClick={() => undoAcceptRequest(props._id)}
                          />
                        </IconButton>
                      );
                  }
                })()}
                {/* <br /> */}
                {/* Status: {props.status} */}
                {/* </Grid> */}
                {/* <Button
                      variant="contained"
                      color="primary"
                      //   className={classes.button}
                      startIcon={<CheckCircleIcon />}
                      size="small"
                    >
                      Accept
                    </Button>
                    <br/>
                    <Button
                      variant="contained"
                      color="secondary"
                      //   className={classes.button}
                      startIcon={<NotInterestedIcon />}
                      size="small"
                    >
                      Cancel
                    </Button> */}
              </ListItem>
              {/* <Divider /> */}
              {/* <Divider variant="middle" /> */}
            </div>
          )}
        {/* </List> */}
      </Grid>
    </div>
  );
}
