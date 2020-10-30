import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    // borderRadius: "0 0 20px 20px"
    marginTop: 30,

  },
  avatarImg: {
    position: "absolute",
    // transform: "translate(130%, -120%)",
    top: 140,
    left: 130,
    border: "4px solid white",
    height: "80px",
    width: "80px",
  },
  fullName: {
    position: "absolute",
    top: 80,
    margin: "0 auto",
    color: "white",
  },
  Typography: {
    fontFamily: "Montserrat",
    marginBottom: 10,
    marginLeft: 5,
  },
}));

export default function ImgMediaCardProfile(props) {
  const classes = useStyles();

  return (
    // TODO replace hardcode with dynamic object from feedlist array
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Card Media"
          height="180vh"
          image="https://images.unsplash.com/photo-1541497613813-0780960684f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          title="bgImage"
        />

        <CardContent>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="center"
          >
            <Avatar
              className={classes.avatarImg}
              alt="Profile pic"
              src={require("../../assets/avatar-mine-worker.png")}
              // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            />
            <Typography
              variant="h4"
              component="h4"
              color="primary"
              className={classes.fullName}
            >
              {props.currentUser.firstName + " " + props.currentUser.lastName}
            </Typography>
          </Grid>

          <div>
            <Typography variant="caption" component="h4">
              <EmojiEventsIcon color="primary" />
              BALANCE
            </Typography>

            <Typography variant="h4" component="span" color="primary">
              250
            </Typography>
            <Typography variant="h5" component="span">
              PTS
            </Typography>
            <hr />
          </div>

          <Grid
            container
            justify="center"
            direction="column"
            alignItems="flex-start"
          >
            <Grid container alignItems="center" gutterbottom>
              <PermIdentityIcon color="primary" />
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                className={classes.Typography}
              >
                {/* TODO {props.role} */}
                Project Engineer
              </Typography>
            </Grid>

            <Grid container alignItems="center" gutterbottom>
              <AlternateEmailIcon color="primary" />
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                className={classes.Typography}
              >
                {props.currentUser.email}
              </Typography>
            </Grid>

            <Grid container alignItems="center" gutterbottom>
              <PhoneEnabledIcon color="primary" />

              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                className={classes.Typography}
              >
                {props.currentUser.phone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="flex-end" alignItems="center">
          <Button size="small" color="primary"> 
            UPDATE
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
