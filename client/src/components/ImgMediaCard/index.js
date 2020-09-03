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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    // TODO replace hardcode with dynamic object from feedlist array
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Card Media"
          height="250"
          image="https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          title="Card Media Title"
        />
        <CardContent>
            <Typography   display="block" variant="caption" component="h4">
              HEADPHONES
            </Typography>
          <Grid container justify="flex-end" alignItems="flex-end">
            <Typography variant="h2" component="h2" color="primary">
              250 
            </Typography>
            <Typography variant="h4" component="h4">
              PTS
            </Typography>
          </Grid>
          <Grid container justify="flex-start" alignItems="center" spacing={3}>
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            />
            {/* Grid item under Grid container spacing={?} allows some spacing */}
            <Grid item>
              <Typography
                display="block"
                variant="subtitle1"
                // variant="overline"
                // variant="subtitle2"
                // variant="body1"
                // variant="body2"
                // variant="button"
                // variant="caption"
         
                color="textSecondary"
                component="h5"
              >
                James Horner
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Project Engineer
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" color="textSecondary" component="h6">
            Just redeemed new headphones for 250 points...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="flex-end" alignItems="center">
          <Button size="small" color="primary">
            View Product
          </Button>
          {/* <Button size="small" color="primary">
            Learn More
          </Button> */}
        </Grid>
      </CardActions>
    </Card>
  );
}
