import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OverviewCard from '../components/Cards/OverviewCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: theme.spacing(3),
    width: '100vw',
    height: '100vh',
    marginTop: theme.spacing(10),
  }
}));

export default function Overview() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}><OverviewCard /></Paper>
          </Grid>
        </Grid>
      </div>
  );
}