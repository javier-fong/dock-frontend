import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import PhotoJournalEditDelModal from '../PhotoJournal/PhotoJournalEditDelModal';
import moment from 'moment';
import ImageModal from './PhotoJournalImageModel';
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
        maxWidth: 360,
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(4),
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
    avatar: {
        backgroundColor: red[500],
        marginLeft: '-10px'
    },
    classHeaderStyle: {
        textAlign: 'left',
    }
}));

export default function PhotoJournalCard(props) {
    const classes = useStyles();

    const [openImage, setOpenImage] = useState(false);

    // Generate random color
    const getRandomColors = () => colors[Math.floor(Math.random() * colors.length)];

    const handleOpenImage = () => {
        setOpenImage(true);
    }

    const handleCloseImage = () => {
        setOpenImage(false);
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.image}
                onClick={handleOpenImage}
            />
            <ImageModal
                open={openImage}
                setModalClose={handleCloseImage}
                modalState={openImage}
                image={props.image}
                caption={props.caption}
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="photojournal" className={classes.avatar} style={{ backgroundColor: getRandomColors() }}>
                        {props.owner.charAt(0)}
                    </Avatar>
                }
                action={
                    <PhotoJournalEditDelModal />
                }
                title={props.owner}
                subheader={moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}
                className={classes.classHeaderStyle}
            />
            {/* <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'left' }}>
                    {props.caption}
                </Typography>
            </CardContent> */}
        </Card>
    );
}