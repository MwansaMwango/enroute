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
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
    maxWidth: 400,
    // display: "block",
    // width: "fit-content",
    // width: "100%",
    width: "95vw",

    // marginBottom: theme.spacing(0.5),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    // color: theme.palette.text.secondary,
    // marginBottom: theme.spacing(1),

    "& svg": {
      margin: theme.spacing(0),
      "& hr": {
        margin: theme.spacing(0),
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
  let phoneLink = "tel:" + props.user_id.phone;
  let smsLink = "sms:" + props.user_id.phone;

  return (
    <List>
      <Grid container justify="center" direction="column" alignItems="stretch">
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
                  props.status === "Confirmed" ? (
                    <a href={phoneLink}>{props.user_id.phone}</a>
                  ) : (
                    props.status
                  )
                }
              />
              {/* <Divider variant="middle" /> */}

              <ListItemText
              primary="20" // hard coded for MVP
              secondary="pts"
            />

              {/* <Divider variant="middle" /> */}

              <ListItemText
                primary={moment(props.departDate).format("DD MMM")}
                secondary={props.departTime}
              />

              {/* <Divider variant="middle" /> */}
              {(() => {
                switch (props.status) {
                  case "Pending":
                    return (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          acceptRequest(props._id);
                        }}
                        startIcon={<CheckCircleIcon />}
                        fontSize="medium"
                      >
                        Accept
                      </Button>
                    );

                  case "Confirmed":
                    return (
                      <Grid direction="row" justify="space-evenly" alignItems="center">
                          <a href={smsLink}>
                        <IconButton edge="end" aria-label="Sms">
                            <MessageIcon color="secondary" fontSize="large" />
                        </IconButton>
                          </a>

                        <IconButton edge="end" aria-label="Cancel">
                          <CancelIcon
                            color="disabled"
                            fontSize="large"
                            onClick={() => undoAcceptRequest(props._id)}
                          />
                        </IconButton>

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
