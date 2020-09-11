import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OverviewCard from '../components/Overview/OverviewCard';
import { UserContext } from '../pages/DashboardPage';
import api from '../components/Api';
import OverviewPhoto from '../components/Overview/OverviewPhoto';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridStyle: {
    marginBottom: theme.spacing(3)
  }
}));

export default function Overview() {
  const classes = useStyles();

  // Imported user email
  const { userEmail } = useContext(UserContext);

  const [journalPost, setJournalPost] = useState([]);

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

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.gridStyle}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              {journalPost.map(post => 
                <OverviewPhoto 
                  caption={post.caption}
                  image={post.image}
                />  
              )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}><OverviewCard /></Paper>
        </Grid>
        <Grid item xs={4}>
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