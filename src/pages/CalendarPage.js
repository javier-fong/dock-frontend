import React from 'react';
import Calendar from '../components/Calendar/Calendar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    calendarDiv: {
        margin: theme.spacing(4),
        marginTop: theme.spacing(1)
    }
}));

const CalendarPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.calendarDiv}>
            <Calendar />
        </div>
    )
}

export default CalendarPage
