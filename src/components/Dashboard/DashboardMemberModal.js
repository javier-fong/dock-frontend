import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2)
        },
        display: 'flex',
        alignItems: 'center'
    }
}));

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddCircleOutlineIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                autoFocus='true'
            >
                <div className={classes.root}>
                    <form>
                        <InputBase
                            inputComponent='input'
                            placeholder="Add member"
                            inputProps={{ 'aria-label': 'add member' }}
                        />
                        <IconButton color='secondary'>
                            <AddCircleIcon />
                        </IconButton>
                    </form>
                </div>
            </Menu>
        </div>
    );
}
