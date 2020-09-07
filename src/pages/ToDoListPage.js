import React, { useEffect, useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import TodoListCard from '../components/Todo/TodoListCard';
import api from '../components/Api';
import { UserContext } from './DashboardPage';
import TodoListForm from '../components/Todo/TodoListForm';

export const TodosContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        display: 'flex',
        // margin: 'auto',
        // justifyContent: 'space-around',
        flexWrap: 'wrap',
        // height: '100%',
        width: '100%'
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

const ToDoListPage = (props) => {
    const classes = useStyles();

    // Imported user email
    const { userEmail } = useContext(UserContext);

    // States
    const [toDoLists, setToDos] = useState([]);

    useEffect(() => {
        if (userEmail) {
            api.getToDos(userEmail)
                .then(res => {
                    setToDos(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return undefined;
        }
    }, [userEmail])

    const addToDoList = async (toDoList, owner) => {
        try {
            const payload = {
                owner: owner,
                toDoListName: toDoList,
                email: userEmail
            }
            await api.addToDoList(payload);
            const response = await api.getToDos(userEmail);
            setToDos(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    const addToDoItem = async (id, payload) => {
        try {
            await api.addToDoItem(id, payload);
            const response = await api.getToDos(userEmail);
            setToDos(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    const updateToDoListName = async (id, payload) => {
        try {
            await api.updateToDoListName(id, payload);
            const response = await api.getToDos(userEmail);
            setToDos(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    const deleteToDoList = async id => {
        try {
            await api.deleteToDoList(id);
            if (toDoLists.length === 1) {
                window.location.reload();
            } else {
                const response = await api.getToDos(userEmail);
                setToDos(response.data);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteItem = async (id, payload) => {
        try {
            await api.deleteToDoItem(id, payload);
            const response = await api.getToDos(userEmail);
            setToDos(response.data);
        } catch(err) {
            console.log(err)
        }
    }

    const updateToDoItem = async (id, payload) => {
        try {
            await api.updateToDoItem(id, payload);
            const response = await api.getToDos(userEmail);
            setToDos(response.data);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <TodoListForm addToDoList={addToDoList} />
            <Divider />
            <div className={classes.root}>
                {toDoLists.map(toDoList =>
                    <TodoListCard
                        key={toDoList._id}
                        id={toDoList._id}
                        name={toDoList.toDoListName}
                        toDoItems={toDoList.description}
                        email={toDoList.email}
                        addToDoItem={addToDoItem}
                        updateToDoListName={updateToDoListName}
                        deleteToDoList={deleteToDoList}
                        deleteItem={deleteItem}
                        updateToDoItem={updateToDoItem}
                        owner={toDoList.owner}
                    />
                )}
            </div>
        </Fragment>
    )
}

export default ToDoListPage
