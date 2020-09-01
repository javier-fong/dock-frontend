import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 800,
        margin: 'auto',
        marginBottom: theme.spacing(3),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: '100%'
    },
    iconButton: {
        // flex: '1 1'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    formStyle: {
        width: '100%',
        textAlign: 'left'
    }
}));

export default function CustomizedInputBase(props) {
    const classes = useStyles();

    const [listFormValue, setListFormValue] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await props.addToDoList(listFormValue);
            setListFormValue('');
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleFormSubmit} className={classes.formStyle}>
                <InputBase
                    className={classes.input}
                    inputComponent='input'
                    placeholder="Add To Do List"
                    inputProps={{ 'aria-label': 'add to do list' }}
                    value={listFormValue}
                    onChange={event => setListFormValue(event.target.value)}
                />       
            </form>
            <IconButton color='primary' className={classes.iconButton} onClick={handleFormSubmit}>
                <AddCircleIcon />
            </IconButton>
        </Paper>
    );
}
