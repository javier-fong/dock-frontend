import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        // minWidth: 275,
        height: '100%',
        boxShadow: 'none'
    },
    pos: {
        marginBottom: 12,
    },
    headerStyle: {
        marginBottom: theme.spacing(3),
    },
    // dateStyle: {
    //     display: 'flex',
    //     justifyContent: 'space-around'
    // },
    fontStyle: {
        fontSize: '6vw',
        marginTop: theme.spacing(-3),
        marginBottom: theme.spacing(-3)
    },
    dateContainer: {
        marginBottom: theme.spacing(4)
    }
}));

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h5' color="textSecondary" gutterBottom className={classes.headerStyle}>
                    Upcoming Events
                </Typography>
                <div className={classes.dateContainer}>
                    <Typography className={classes.fontStyle}>
                        {moment(props.start).format("D MMM")}
                    </Typography>
                    <Typography variant='h6' className={classes.pos} color="textSecondary">
                        {moment(props.start).format('h:mm:ss a')}
                    </Typography>
                </div>
                <Typography variant="h5" noWrap>
                    {props.title}
                </Typography>

            </CardContent>
        </Card>
    );
}
