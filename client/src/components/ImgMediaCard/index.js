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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
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
          <Grid container justify="flex-end" alignItems="flex-end">
            <Typography
              variant="h2"
              component="h2"
              color="primary"
            >
              250
            </Typography>
            <Typography variant="h4" component="h4">
              PTS
            </Typography>
          </Grid>
            <Typography variant="h5" color="textSecondary" component="h5">
              Redeem your new headphones for 250 points...
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Grid container justify="space-between" alignItems="flex-end">
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
