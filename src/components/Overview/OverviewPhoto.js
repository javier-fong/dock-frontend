import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        '&:hover': {
            cursor: 'pointer'
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    classHeaderStyle: {
        width: '100%',
        textAlign: 'left'
    },
    cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden",
        textAlign: 'center'
    }
}));

export default function PhotoJournalCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardHeader
                title={
                    <Typography noWrap gutterBottom variant="h6" style={{ marginBottom: 0 }}>
                        {props.caption}
                    </Typography>
                }
                subheader={moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}
                className={classes.classHeaderStyle}
                classes={{
                    root: classes.cardHeaderRoot,
                    content: classes.cardHeaderContent
                }}
            />
        </Card>
    );
}