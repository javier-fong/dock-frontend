import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
    delButtonStyle: {
        margin: theme.spacing(1),
        marginTop: 0,
    },
    delButtonStyle2: {
        margin: theme.spacing(1),
        marginTop: 0,
        backgroundColor: theme.palette.secondary.light
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(1)
    },
    buttonStyle: {
        marginLeft: theme.spacing(1)
    },
    formStyle: {
        '& > *': {
            width: '50ch',
        },
        display: 'flex',
        flexDirection: 'column'
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
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [item, setItem] = useState('');

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleDeleteItem = async () => {
        try {
            await props.deleteItem(props.id, props.description);
            setOpenDelete(false);
        } catch (err) {
            console.log(err)
        }
    }

    const handleEditItem = async event => {
        event.preventDefault();
        try {
            const payload = {
                index: props.index,
                description: item
            }
            await props.updateToDoItem(props.id, payload)
            setItem('');
            setOpenEdit(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments" onClick={handleOpenEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments" onClick={handleOpenDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>

            {/* Edit todo item */}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/* <Fade in={openEdit}> */}
                    <div className={classes.paper}>
                    <h4 id="spring-modal-title">Edit Item</h4>
                        <form className={classes.formStyle} noValidate autoComplete="off" onSubmit={handleEditItem} >
                            <TextField
                                id="standard-basic"
                                // label="Edit item"
                                placeholder={props.description}
                                autoFocus={true}
                                onChange={event => setItem(event.target.value)}
                                value={item}
                            />
                            <div className={classes.buttonDiv}>
                                <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleCloseEdit}>
                                    Close
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={handleEditItem} >
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </div>
                {/* </Fade> */}
            </Modal>

            {/* Delete todo item */}
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openDelete}
                onClose={handleCloseDelete}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {/* <Fade in={openDelete}> */}
                    <div className={classes.paper} style={{ textAlign: 'center' }}>
                        <h2 id="spring-modal-title">Confirm Delete</h2>
                        <p>Are you sure you want to delete this item?</p>
                        <div className={classes.buttonDiv} style={{ justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" className={classes.delButtonStyle} onClick={handleCloseDelete}>
                                Close
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.delButtonStyle2} onClick={handleDeleteItem}>
                                Delete
                            </Button>
                        </div>
                    </div>
                {/* </Fade> */}
            </Modal>
        </div>
    );
}
