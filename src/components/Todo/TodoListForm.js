import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import { UserContext } from '../../pages/DashboardPage';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: 800,
        margin: 'auto',
        marginBottom: theme.spacing(3),
    },
    input: {
        marginLeft: theme.spacing(2),
        flex: 1,
        width: '100%'
    },
    iconButton: {
        marginRight: theme.spacing(1)
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formStyle: {
        width: '100%',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        marginRight: theme.spacing(2),
        minWidth: 120,
        paddingBottom: theme.spacing(2)
    },
    dividerStyle: {
        height: 50,
        margin: 4,
    },
}));

export default function CustomizedInputBase(props) {
    const classes = useStyles();

    // Imported user data state
    const { userMembers } = useContext(UserContext);

    const [listFormValue, setListFormValue] = useState('');
    const [toggleListFormValue, setToggleListFormValue] = useState(false);
    const [owner, setOwner] = useState('');
    const [toggleOwner, setToggleOwner] = useState(false);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            if (listFormValue === '') setToggleListFormValue(true);
            if (owner === '') setToggleOwner(true);
            if (listFormValue && owner !== '') {
                await props.addToDoList(listFormValue, owner);
                setListFormValue('');
                setOwner('');
                setToggleListFormValue(false);
                setToggleOwner(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSelectChange = event => {
        setOwner(event.target.value);
    };

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleFormSubmit} className={classes.formStyle}>
                <FormControl className={classes.input} error={toggleOwner ? true : false}>
                    <InputBase
                        inputComponent='input'
                        placeholder="Add To Do List"
                        inputProps={{ 'aria-label': 'add to do list' }}
                        value={listFormValue}
                        onChange={event => setListFormValue(event.target.value)}
                        required
                    />
                    {toggleOwner ? <FormHelperText>Required</FormHelperText> : null}
                </FormControl>
                <FormControl className={classes.formControl} error={toggleListFormValue ? true : false}>
                    <InputLabel id="demo-simple-select-label" htmlFor="member-native-required">Owner</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={owner}
                        onChange={handleSelectChange}
                        inputProps={{
                            id: 'member-native-required',
                        }}
                    >
                        {userMembers.map((member, index) =>
                            <MenuItem key={index} value={member}>
                                {member}
                            </MenuItem>
                        )}
                    </Select>
                    {toggleListFormValue ? <FormHelperText>Required</FormHelperText> : null}
                </FormControl>
            </form>
            <Divider className={classes.dividerStyle} orientation="vertical" />
            <IconButton color='secondary' className={classes.iconButton} onClick={handleFormSubmit}>
                <AddCircleIcon />
            </IconButton>
        </Paper>
    );
}
