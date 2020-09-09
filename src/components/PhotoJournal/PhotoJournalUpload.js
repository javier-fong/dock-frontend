import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PhotoJournalUploadModal from './PhotoJournalUploadModal';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        marginBottom: theme.spacing(1.8)
    }   
}))

export default function CenteredTabs(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <PhotoJournalUploadModal handleCreateJournalPost={props.handleCreateJournalPost}/>
        </Paper>
    );
}
