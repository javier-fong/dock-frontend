import React, { Fragment, useEffect, useState } from 'react';
import { Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Pagination } from '@material-ui/lab/';
import TodoItemModal from '../Todo/TodoItemModal';
import api from '../api';

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
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(null);
  const [isComplete, setIsComplete] = useState(null);

  const toDoItems = props.toDoItems;

  const handleNoOfpages = async () => {
    await setNoOfPages(Math.ceil(toDoItems.length / itemsPerPage))
  }

  useEffect(() => {
    handleNoOfpages()
  })

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleToggle = (value, id) => async () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      setIsComplete(!isComplete)
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // const markCompleteStyle = () => {
  //   return {
  //     textDecoration: toDoItems.completed ? 'line-through' : 'none',
  //   }
  // }

  return (
    <Fragment>
      <List className={classes.root}>
        {toDoItems
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((todo, index) => {
            const labelId = `checkbox-list-label-${todo}`;
            return (
              <ListItem key={index} id={index} role={undefined} dense button>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(todo) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={handleToggle(todo, index)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={todo} />
                <TodoItemModal
                  id={props.id}
                  index={index}
                  description={todo}
                  deleteItem={props.deleteItem}
                  updateToDoItem={props.updateToDoItem}
                />
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
