import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PublishIcon from '@material-ui/icons/Publish';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { UserContext } from '../../pages/DashboardPage';

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
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    },
    formStyle: {
        '& > *': {
            width: '80ch',
        },
        display: 'flex',
        flexDirection: 'column'
    },
    uploadButtonStyle: {
        marginRight: theme.spacing(19),
        marginBottom: theme.spacing(1),
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
    },
    formControlStyle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

export default function SpringModal(props) {
    const classes = useStyles();

    // Imported user data state
    const { userMembers } = useContext(UserContext);

    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState('');
    const [toggleOwner, setToggleOwner] = useState(false);
    const [image, setImage] = useState('');
    const [toggleImage, setToggleImage] = useState(false);
    const [caption, setCaption] = useState('');
    const [toggleCaption, setToggleCaption] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setOwner('');
        setImage('');
        setCaption('');
        setToggleOwner(false);
        setToggleImage(false);
        setToggleCaption(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = event => {
        setOwner(event.target.value);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            if (owner === '') setToggleOwner(true);
            if (image === '') setToggleImage(true);
            if (caption === '') setToggleCaption(true);
            if (owner && image && caption !== '') {
                await props.handleCreateJournalPost(owner, image, caption);
                setOwner('');
                setImage('');
                setCaption('');
                setOpen(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Button className={classes.uploadButtonStyle} onClick={handleOpen}>
                <PublishIcon className={classes.iconStyle} />
                <Typography variant='body1'>Upload</Typography>
            </Button>

            {/* Add photo journal */}
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
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h4 id="spring-modal-title">Upload Photo</h4>
                        <form className={classes.formStyle} autoComplete="off" onSubmit={handleFormSubmit}>
                            <FormControl variant="outlined" className={classes.formControlStyle} error={toggleOwner ? true : false}>
                                <InputLabel id="demo-simple-select-label">Posted by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={owner}
                                    onChange={handleSelectChange}
                                    label="Posted by"
                                >
                                    {userMembers.map((member, index) =>
                                        <MenuItem key={index} value={member}>
                                            {member}
                                        </MenuItem>
                                    )}
                                </Select>
                                {toggleOwner ? <FormHelperText>Required</FormHelperText> : null}
                            </FormControl>
                            <TextField
                                id="standard-basic"
                                // placeholder='Add image link'
                                label="Add image link"
                                multiline
                                rows={1}
                                variant="outlined"
                                onChange={event => setImage(event.target.value)}
                                value={image}
                                className={classes.textFieldStyle}
                                helperText={toggleImage ? 'Required' : null}
                                type='url'
                                error={toggleImage ? true : false}
                            />
                            <TextField
                                id="standard-multiline-static"
                                label="Add a caption"
                                multiline
                                rows={6}
                                // placeholder="Add a caption"
                                variant="outlined"
                                className={classes.textFieldStyle}
                                onChange={event => setCaption(event.target.value)}
                                value={caption}
                                helperText={toggleCaption ? 'Required' : null}
                                error={toggleCaption ? true : false}
                            />
                            <div className={classes.buttonDiv}>
                                <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={handleFormSubmit}>
                                    Upload
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
