import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [member, setMember] = useState('');

    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMemberSubmit = async event => {
        event.preventDefault();
        try {
            const payload = {
                members: member
            }
            await props.handleAddMember(payload);
            setMember('');
            setAnchorEl(null);
        } catch(err) {
            console.log(err)
        }
    }

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
            >
                <div className={classes.root}>
                    <form onSubmit={handleMemberSubmit}>
                        <InputBase
                            inputComponent='input'
                            placeholder="Add member"
                            inputProps={{ 'aria-label': 'add member' }}
                            onChange={event => setMember(event.target.value)}
                            value={member}
                            autoFocus={true}
                        />
                        <IconButton color='secondary' onClick={handleMemberSubmit}>
                            <AddCircleIcon />
                        </IconButton>
                    </form>
                </div>
            </Menu>
        </div>
    );
}
