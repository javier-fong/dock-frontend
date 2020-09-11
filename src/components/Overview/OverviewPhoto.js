import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { purple, red, pink, blue, cyan, teal, green, orange, brown, blueGrey } from '@material-ui/core/colors';

const new_purple = purple[400];
const new_red = red[400];
const new_pink = pink[400];
const new_blue = blue[400];
const new_cyan = cyan[400];
const new_teal = teal[400];
const new_green = green[400];
const new_orange = orange[400];
const new_brown = brown[400];
const new_blueGrey = blueGrey[400];
const colors = [new_purple, new_red, new_pink, new_blue, new_cyan, new_teal, new_green, new_orange, new_brown, new_blueGrey];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        // margin: theme.spacing(2),
        height: '100%'
    },
    media: {
        // height: 0,
        paddingTop: '56.25%',
        // '&:hover': {
        //     cursor: 'pointer'
        // }
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
        textAlign: 'left',
    },
    cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden",
        // textAlign: 'center'
    }
}));

export default function PhotoJournalCard(props) {
    const classes = useStyles();

    // Generate random color
    const getRandomColors = () => colors[Math.floor(Math.random() * colors.length)];

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="photojournal" className={classes.avatar} style={{ backgroundColor: getRandomColors() }}>
                        {props.owner.charAt(0)}
                    </Avatar>
                }
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