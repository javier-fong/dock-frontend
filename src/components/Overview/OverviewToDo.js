import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function DenseAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color='secondary'>
                <Toolbar variant="dense">
                    <MenuIcon className={classes.menuButton} />
                    <Typography variant="h6" color="inherit">
                        {props.name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
