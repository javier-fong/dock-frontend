import React from 'react';
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
  iconButton: {
    margin: 0,
    padding: '8px'
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

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [toggleDropDown, setToggleDropDown] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleDropDown = (event) => {
    setToggleDropDown(event.currentTarget);
  };

  const handleDropDownClose = () => {
    setToggleDropDown(null);
  };

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
        <MenuItem onClick={handleOpen}><AddCircleIcon style={{ marginRight: '10px' }} />Add to do</MenuItem>
        <MenuItem onClick={handleOpen2}><EditIcon style={{ marginRight: '10px' }} />Edit list name</MenuItem>
        <MenuItem onClick={handleOpen}><DeleteIcon style={{ marginRight: '10px' }} />Delete list</MenuItem>
      </Menu>
      
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
            <h2 id="spring-modal-title">Spring modal</h2>
            <p id="spring-modal-description">react-spring animates me.</p>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Spring modal 2</h2>
            <p id="spring-modal-description">react-spring animates me. 2</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}