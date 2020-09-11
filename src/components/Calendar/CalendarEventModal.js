import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    },
    formStyle: {
        '& > *': {
            width: '60ch',
        },
        display: 'flex',
        flexDirection: 'column'
    },
    uploadButtonStyle: {
        marginTop: theme.spacing(-1),
        marginBottom: theme.spacing(2),
        float: 'right',
        textTransform: 'capitalize'
    },
    iconStyle: {
        marginRight: theme.spacing(1)
    },
    buttonStyle: {
        marginLeft: theme.spacing(1)
    },
    textFieldStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export default function SpringModal(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [toggletitle, setToggletitle] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleOpen = () => {
        setOpen(true);
        setTitle('');
        setStartDate(new Date());
        setEndDate(new Date());
        setToggletitle(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            if (title === '') setToggletitle(true);
            if (title !== '') {
                await props.createEvent(title, startDate, endDate);
                setTitle('');
                setStartDate(new Date());
                setEndDate(new Date());
                setOpen(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Button variant='outlined' className={classes.uploadButtonStyle} onClick={handleOpen}>
                <AddIcon className={classes.iconStyle} />
                <Typography variant='body1'>Create</Typography>
            </Button>

            {/* Create event */}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/* <Fade in={open}> */}
                <div className={classes.paper}>
                    <form className={classes.formStyle} autoComplete="off" onSubmit={handleFormSubmit}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                {/* Start date */}
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label='Start date'
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                {/* Start time */}
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label='Start time'
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                                {/* End date */}
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label='End date'
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                {/* End time */}
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label='End time'
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <TextField
                            id="standard-multiline-static"
                            label="Title"
                            multiline
                            rows={3}
                            // placeholder="Add a title"
                            variant="outlined"
                            className={classes.textFieldStyle}
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                            helperText={toggletitle ? 'Required' : null}
                            error={toggletitle ? true : false}
                        />
                        <div className={classes.buttonDiv}>
                            <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={handleFormSubmit}>
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
                {/* </Fade> */}
            </Modal>
        </div>
    );
}
