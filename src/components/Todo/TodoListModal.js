import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formStyle: {
    '& > *': {
      width: '50ch',
    },
    display: 'flex',
    flexDirection: 'column'
  },
  buttonStyle: {
    marginLeft: theme.spacing(1)
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
  iconButton: {
    margin: 0,
    padding: '8px'
  },
  iconStyle: {
    margin: 0,
    // padding: 0
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
  const [open, setOpen] = useState(false);
  const [openEditListName, setOpenEditListName] = useState(false);
  const [openDeleteList, setOpenDeleteList] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(null);
  const [toDoItem, setToDoItem] = useState('');
  const [listName, setListName] = useState('');

  const handleOpenListItem = () => {
    setOpen(true);
  };

  const handleOpenEditListName = () => {
    setOpenEditListName(true);
  };

  const handleOpenDeleteList = () => {
    setOpenDeleteList(true);
  }

  const handleCloseListItem = () => {
    setOpen(false);
  };

  const handleCloseEditListName = () => {
    setOpenEditListName(false);
  };

  const handleCloseDeleteList = () => {
    setOpenDeleteList(false);
  };

  const handleDropDown = (event) => {
    setToggleDropDown(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setToggleDropDown(null);
  };

  const submitNewItem = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        item: toDoItem,
        completed: false
      }
      await props.addToDoItem(props.id, payload);
      setToDoItem('');
      setOpen(false);
      setToggleDropDown(null);
    } catch (err) {
      console.log(err)
    }
  }

  const updateListName = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        toDoListName: listName
      }
      await props.updateToDoListName(props.id, payload);
      setOpenEditListName(false);
      setListName('');
      setToggleDropDown(null);
    } catch (err) {
      console.log(err)
    }
  }

  const deleteList = async () => {
    try {
      await props.deleteToDoList(props.id);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <IconButton className={classes.iconButton} onClick={handleDropDown}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={toggleDropDown}
        keepMounted
        open={Boolean(toggleDropDown)}
        onClose={handleDropDownClose}
      >
        <MenuItem onClick={handleOpenListItem}><AddCircleIcon style={{ marginRight: '10px' }} />Add new item</MenuItem>
        <MenuItem onClick={handleOpenEditListName}><EditIcon style={{ marginRight: '10px' }} />Edit list name</MenuItem>
        <MenuItem onClick={handleOpenDeleteList}><DeleteIcon style={{ marginRight: '10px' }} />Delete list</MenuItem>
      </Menu>

      {/* Add new item */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseListItem}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <Fade in={open}> */}
          <div className={classes.paper}>
            <h4 id="spring-modal-title">Add New Item</h4>
            <form className={classes.formStyle} noValidate autoComplete="off" onSubmit={submitNewItem}>
              <TextField
                id="standard-basic"
                label="New item"
                autoFocus={true}
                onChange={event => setToDoItem(event.target.value)}
                value={toDoItem}
              />
              <div className={classes.buttonDiv}>
                <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleCloseListItem}>
                  Close
                </Button>
                <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={submitNewItem}>
                  Add
                </Button>
              </div>
            </form>
          </div>
        {/* </Fade> */}
      </Modal>

      {/* Edit list name */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openEditListName}
        onClose={handleCloseEditListName}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <Fade in={openEditListName}> */}
          <div className={classes.paper}>
            <h4 id="spring-modal-title">Edit List Name</h4>
            <form className={classes.formStyle} noValidate autoComplete="off" onSubmit={updateListName}>
              <TextField
                id="standard-basic"
                label="New name"
                placeholder={props.name}
                autoFocus={true}
                onChange={event => setListName(event.target.value)}
                value={listName}
              />
              <div className={classes.buttonDiv}>
                <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleCloseEditListName}>
                  Close
                </Button>
                <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={updateListName}>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        {/* </Fade> */}
      </Modal>

      {/* Delete list */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openDeleteList}
        onClose={handleCloseDeleteList}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <Fade in={openDeleteList}> */}
          <div className={classes.paper} style={{ textAlign: 'center' }}>
            <h2 id="spring-modal-title">Confirm Delete</h2>
            <p>Are you sure you want to delete this list?</p>
            <div className={classes.buttonDiv} style={{ justifyContent: 'center' }}>
              <Button variant="contained" color="primary" className={classes.delButtonStyle} onClick={handleCloseDeleteList}>
                Close
                </Button>
              <Button variant="contained" color="secondary" className={classes.delButtonStyle2} onClick={deleteList}>
                Delete
                </Button>
            </div>
          </div>
        {/* </Fade> */}
      </Modal>
    </div>
  );
}