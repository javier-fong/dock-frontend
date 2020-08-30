import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TodoCard from '../components/Cards/TodoCard';
import api from '../components/api';
import { UserContext } from './DashboardPage';

export const TodosContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh'
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    content: {
        padding: theme.spacing(3),
        width: '100vw',
        height: '100vh',
        marginTop: theme.spacing(10),
    }
}));

const ToDoListPage = () => {
    const classes = useStyles();

    // Imported user email
    const { userEmail } = useContext(UserContext);

    // States
    const [todos, setToDos] = useState([]);

    useEffect(() => {
        api.getToDos(userEmail)
            .then(res => {
                setToDos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [userEmail])

    const markComplete = (id) => {
        setToDos(todos.map(todo => {
            if (todo._id === id) todo.completed = !todo.completed
            return todo
        }))
    }

    return (
        // <TodosContext.Provider value={todos}>
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <TodoCard name={'Shared To Do List'} todos={todos} markComplete={markComplete} />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}></Paper>
                    </Grid>
                </Grid>
            </div>
        // </TodosContext.Provider>
    )
}

export default ToDoListPage
