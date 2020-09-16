import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { UserContext } from '../pages/DashboardPage';
import api from '../components/Api';
import OverviewPhoto from '../components/Overview/OverviewPhoto';
import OverviewCalendar from '../components/Overview/OverviewCalendar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import OverviewToDo from '../components/Overview/OverviewToDo';
import ListIcon from '@material-ui/icons/List';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '80vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    borderRadius: '15px',
    boxShadow: 'none'
  },
  paperEvents: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    borderRadius: '15px',
    boxShadow: 'none'
  },
  gridStyle: {
    marginBottom: theme.spacing(3),
  },
  headerStyle: {
    marginLeft: theme.spacing(3),
  },
  eventHeaderStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconStyle: {
    marginLeft: theme.spacing(1),
  },
  calendarStyle: {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    border: 'none'
  },
  linkStyle: {
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  linkDiv: {
    marginRight: theme.spacing(3)
  }
}));

export default function Overview() {
  const classes = useStyles();

  // Imported user email
  const { userEmail } = useContext(UserContext);

  const [journalPosts, setJournalPost] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);
  const [latestEvents, setLatestEvents] = useState([]);
  const [toDos, setToDos] = useState([]);

  // Get journal posts
  useEffect(() => {
    if (userEmail) {
      api.getThreeJournalPosts(userEmail).then(res => {
        setJournalPost(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      return undefined;
    }
  }, [userEmail])

  // Get three to dos
  useEffect(() => {
    if (userEmail) {
      api.getThreeToDos(userEmail).then(res => {
        setToDos(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      return undefined;
    }
  }, [userEmail])

  // Get calendar events
  useEffect(() => {
    if (userEmail) {
      api.getCalendarEvents(userEmail).then(res => {
        setCalendarEvent(res.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      return undefined;
    }
  }, [userEmail])

  // Sort calendar events to latest 3
  useEffect(() => {
    const newEvents = calendarEvent.sort((a, b) => {
      return new Date(b.start) - new Date(a.start)
    }).slice(0, 3)
    setLatestEvents(newEvents)
  }, [calendarEvent])

  return (
    <div className={classes.root}>
      {/* Top Grid for calendar */}
      <Grid container spacing={4} className={classes.gridStyle}>
        <Grid item xs={9}>
          <Paper className={classes.paperEvents}>
            <div className={classes.eventHeaderStyle}>
              <div style={{ display: 'flex' }}>
                <Typography variant='h5' color="textPrimary" gutterBottom className={classes.headerStyle}>
                  Upcoming Events
              </Typography>
                <NotificationsIcon className={classes.iconStyle} />
              </div>

              <div className={classes.linkDiv}>
                <Link href='/app/calendar' color='inherit' className={classes.linkStyle}>
                  <Typography>
                    View all
                  </Typography>
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              {latestEvents.map((event, index) =>
                <OverviewCalendar
                  key={event._id}
                  index={index}
                  start={event.start}
                  end={event.end}
                  title={event.title}
                />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Calendar className={classes.calendarStyle} />
        </Grid>
      </Grid>

      {/* Bottom grid for photos */}
      <Grid container spacing={4} className={classes.gridStyle}>
        <Grid item xs={9}>
          <Paper className={classes.paperEvents}>
            <div className={classes.eventHeaderStyle}>
              <div style={{ display: 'flex' }}>
                <Typography variant='h5' color="textPrimary" gutterBottom className={classes.headerStyle}>
                  Latest Photos
                </Typography>
                <PhotoCameraIcon className={classes.iconStyle} />
              </div>
              <div className={classes.linkDiv}>
                <Link href='/app/photojournal' color='inherit' className={classes.linkStyle}>
                  <Typography>
                    View all
                  </Typography>
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
              {journalPosts.map((post, index) =>
                <OverviewPhoto
                  key={post._id}
                  index={index}
                  caption={post.caption}
                  date={post.date}
                  owner={post.owner}
                  image={post.image}
                />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div className={classes.eventHeaderStyle}>
              <div style={{ display:'flex' }}>
                <Typography variant='h5' color="textPrimary" gutterBottom className={classes.headerStyle}>
                  Latest To Do Lists
                </Typography>
                <ListIcon className={classes.iconStyle} />
              </div>
              <div className={classes.linkDiv}>
                <Link href='/app/todolist' color='inherit' className={classes.linkStyle}>
                  <Typography>
                    View all
                  </Typography>
                </Link>
              </div>
            </div>
            <div>
              {toDos.map((todo, index) =>
                <OverviewToDo
                  key={todo._id}
                  name={todo.toDoListName}
                />
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}