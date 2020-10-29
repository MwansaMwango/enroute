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
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  margin: "10px 0px 10px 0px",
  borderRadius: 20,
  pointerEvents: 'none', // remove click options from card
  },

  typography: {
    fontFamily: "Montserrat",
  },
}));

export default function TripCardHeader(props) {
  const classes = useStyles();

  return (
    // TODO replace hardcode with dynamic object from feedlist array
    
    <Card className={classes.root} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Card Media"
          height="200vw"
    
          image={require("../../assets/undraw-navigator.svg")}
          title="Card Media Title"
        />
        <CardContent>
          {/* <Typography display="block" variant="caption" component="h4">
            Drive
          </Typography> */}
          {/* <Grid container justify="flex-end" alignItems="flex-end">
            <Typography variant="h2" component="h2" color="primary">
              28th
            </Typography>
            <Typography variant="h4" component="h4">
              OCT
            </Typography>
          </Grid> */}

          <Grid item justify="center" alignItems="center">
            {/* <Avatar
              alt="Profile Pic"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            /> */}
            {/* Grid item under Grid container spacing={?} allows some spacing */}
       
              <Typography
                variant="button"
                // variant="subtitle2"
                // variant="body1"
                // variant="body2"
                // variant="button"
                // variant="caption"
                className={classes.typography}
                color="primary"
                component="h2"
                
              >
                {console.log(props)}
                <strong>
                {props.selectedTripData.from} - {props.selectedTripData.to}
                  </strong>
              </Typography>

              <Typography className={classes.typography} variant="h6" component="h6">
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  gutterBottom
                >
                  <EventIcon color="primary" />{moment(props.selectedTripData.departDate).format("Do-MMM-YY")}
                  <ScheduleIcon color="primary" />{props.selectedTripData.departTime}
                  <AirlineSeatReclineNormalIcon color="primary" />{props.selectedTripData.freeSeats}
                </Grid>
              </Typography>
              <Typography className={classes.typography} variant="subtitle1">
            <Typography className={classes.typography} variant="subtitle1" component="span" color="secondary">
              <b>{props.matches + ' ride(s)'}</b>
            </Typography>
            {' matching this trip!'}
          </Typography>
            {/* </Grid> */}
          </Grid>
        </CardContent>
      </CardActionArea>
      {/* <CardActions> */}
        {/* <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
        > */}
 

          {/* <Button size="small" color="primary">
            Edit Trip
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button> */}
        {/* </Grid> */}
      {/* </CardActions> */}
    </Card>
  );
}
