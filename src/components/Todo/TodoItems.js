import React, { Fragment, useEffect, useState } from 'react';
import { Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Pagination } from '@material-ui/lab/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  }
}));

export default function CheckboxList(props) {
  // Imported Todos state from ToDoListPage
  // const Todos = useContext(TodosContext);

  // States
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(null);
  const [isComplete, setIsComplete] = useState(null);
  
  const Todos = props.todos;

  const handleNoOfpages = async () => {
    await setNoOfPages(Math.ceil(Todos.length / itemsPerPage))
  }

  useEffect(() => {
    handleNoOfpages()
  })

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log(currentIndex)
    if (currentIndex === -1) {
      newChecked.push(value);
      setIsComplete(!isComplete)
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const markCompleteStyle = () => {
    return {
      textDecoration: Todos.completed ? 'line-through' : 'none',
    }
  }

  return (
    <Fragment>
      <List className={classes.root}>
        {Todos
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((todo, index) => {
            const labelId = `checkbox-list-label-${todo}`;

            return (
              <ListItem key={todo._id} id={todo._id} role={undefined} dense button onClick={handleToggle(todo)}
              style={markCompleteStyle()} onChange={props.markComplete.bind(this, todo._id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(todo) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
      <Divider />
      <Box component="span">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </Fragment>
  );
}
