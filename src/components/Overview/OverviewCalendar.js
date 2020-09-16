import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import TodayIcon from '@material-ui/icons/Today';
import Icon from '@material-ui/core/Icon';
import SubjectIcon from '@material-ui/icons/Subject';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: 350,
        width: '100%',
        // height: '100%',
        margin: theme.spacing(3),
        // borderRadius: '15px',
        // boxShadow: '1px 1px 3px #212121',
        boxShadow: 'none',
    },
    headerStyle: {
        marginBottom: theme.spacing(3),
    },
    dayStyle: {
        fontSize: '2vw'
    },
    dateContainer: {
        display: 'flex'
    },
    titleStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    timeDivStyle: {
        display: 'flex',
        alignItems: 'center'
    },
    iconStyle: {
        marginRight: theme.spacing(1)
    }
}));

export default function SimpleCard(props) {
    const classes = useStyles();

    const borderRight = () => {
        return {
            borderRight: props.index === 2 ? 'none' : '1px solid #03DAC5'
        }
    }

    return (
        <Card className={classes.root} style={borderRight()}>
            <CardContent>
                <div className={classes.dateContainer}>
                    <Icon fontSize='large'>
                        <TodayIcon />
                    </Icon>
                    <Typography className={classes.dayStyle}>
                        {moment(props.start).format("D MMM")} - {moment(props.end).format("D MMM")}
                    </Typography>
                </div>
                <div className={classes.timeDivStyle}>
                    <SubjectIcon className={classes.iconStyle} />
                    <Typography variant="h5" noWrap className={classes.titleStyle}>
                        {props.title}
                    </Typography>
                </div>
                <div className={classes.timeDivStyle}>
                    <WatchLaterIcon className={classes.iconStyle} />
                    <Typography variant='h6' color="textSecondary">
                        {moment(props.start).format('h:mm a')} - {moment(props.end).format('h:mm a')}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
