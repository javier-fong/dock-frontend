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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formStyle: {
    '& > *': {
      width: '80ch',
    },
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(3)
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
    marginTop: theme.spacing(3)
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
  const [openCaption, setOpenCaption] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(null);
  const [caption, setCaption] = useState('');

  const handleOpenCaption = () => {
    setOpenCaption(true);
  };

  const handleOpenDeletePost = () => {
    setOpenDeletePost(true);
  }

  const handleCloseCaption = () => {
    setOpenCaption(false);
  };

  const handleCloseDeletePost = () => {
    setOpenDeletePost(false);
  };

  const handleDropDown = (event) => {
    setToggleDropDown(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setToggleDropDown(null);
  };

  // Handle form to edit caption
  const handleEditCaption = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        caption: caption
      }
      await props.editCaption(props.id, payload);
      setOpenCaption(false);
      setCaption('');
      setToggleDropDown(null);
    } catch (err) {
      console.log(err)
    }
  }

  // Handle delete post
  const handleDeletePost = async () => {
    try {
      await props.deletePost(props.id);
      setOpenDeletePost(false);
      setToggleDropDown(null);
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
        <MenuItem onClick={handleOpenCaption}><EditIcon style={{ marginRight: '10px' }} />Edit caption</MenuItem>
        <MenuItem onClick={handleOpenDeletePost}><DeleteIcon style={{ marginRight: '10px' }} />Delete post</MenuItem>
      </Menu>

      {/* Edit caption */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openCaption}
        onClose={handleCloseCaption}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <Fade in={openCaption}> */}
          <div className={classes.paper}>
            <h4 id="spring-modal-title">Edit Caption</h4>
            <form className={classes.formStyle} noValidate autoComplete="off" onSubmit={handleEditCaption}>
              <TextField
                id="standard-basic"
                label="Caption"
                rows={6}
                multiline
                variant="outlined"
                placeholder={props.caption}
                autoFocus={true}
                onChange={event => setCaption(event.target.value)}
                value={caption}
              />
              <div className={classes.buttonDiv}>
                <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={handleCloseCaption}>
                  Close
                </Button>
                <Button variant="contained" color="secondary" className={classes.buttonStyle} onClick={handleEditCaption}>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        {/* </Fade> */}
      </Modal>

      {/* Delete post */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openDeletePost}
        onClose={handleCloseDeletePost}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeletePost}>
          <div className={classes.paper} style={{ textAlign: 'center' }}>
            <h2 id="spring-modal-title">Confirm Delete</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className={classes.buttonDiv} style={{ justifyContent: 'center' }}>
              <Button variant="contained" color="primary" className={classes.delButtonStyle} onClick={handleCloseDeletePost}>
                Close
              </Button>
              <Button variant="contained" color="secondary" className={classes.delButtonStyle2} onClick={handleDeletePost}>
                Delete
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}