import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OverviewCard from '../components/Overview/OverviewCard';
import { UserContext } from '../pages/DashboardPage';
import api from '../components/Api';
import OverviewPhoto from '../components/Overview/OverviewPhoto';
import OverviewCalendar from '../components/Overview/OverviewCalendar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '80vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%'
  },
  gridStyle: {
    marginBottom: theme.spacing(3),
    // display: 'flex',
    // justifyContent: 'space-around'
  }
}));

export default function Overview() {
  const classes = useStyles();

  // Imported user email
  const { userEmail } = useContext(UserContext);

  const [journalPost, setJournalPost] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);

  useEffect(() => {
    if (userEmail) {
      api.getOneJournalPost(userEmail).then(res => {
        setJournalPost(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      return undefined;
    }
  }, [userEmail])

  useEffect(() => {
    if (userEmail) {
      api.getOneCalendarEvent(userEmail).then(res => {
        setCalendarEvent(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      return undefined;
    }
  }, [userEmail])

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.gridStyle}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
              {journalPost.map(post =>
                <OverviewPhoto 
                  caption={post.caption}
                  image={post.image}
                  owner={post.owner}
                />  
              )}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {calendarEvent.map(event => 
              <OverviewCalendar
                start={event.start}
                end={event.end}
                title={event.title}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><OverviewCard /></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><OverviewCard /></Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} className={classes.gridStyle}>
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