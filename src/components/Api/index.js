import Axios from 'axios';

const api = Axios.create({
    // withCredentials: true,
    headers : {'Access-Control-Allow-Origin': 'https://dock-frontend.herokuapp.com' },
    baseURL: process.env.REACT_APP_MONGODB_URL
    // baseURL: 'http://localhost:3000',
});

/* -------------------- Google Login -------------------- */
// const googleLogin = response => api.post('/googlelogin', {
//     tokenId: response.tokenId
// }).then(response => {
//     console.log('Google login success', response);
//     localStorage.setItem('login', JSON.stringify(response.data.user));
//     console.log(response.data)
//     window.location.href = '/app/dashboard';
// }).catch(err => {
//     console.log(err);
// })
const googleLogin = async response => {
    try {
        const result = await api.post('/googlelogin', { tokenId: response.tokenId });
        console.log('Google login success', result);
        localStorage.setItem('login', JSON.stringify(result.data.user));
        console.log(result.data)
        window.location.href = '/app/dashboard';
    } catch(err) {
        console.log(err)
    }
}

/* ------------------------------- User ------------------------------- */
const deleteMember = (id, payload) => api.delete(`/member/delete/${id}/${payload}`);
const getMembers = email => api.get(`/users/${email}`);
const addMember = (id, payload) => api.put(`/member/add/${id}`, payload);
const registerUser = payload => api.post('/register', payload);
const loginUser = payload => api.post('/login', payload);
const getUser = () => api.get('/user', { withCredentials: true });

/* ------------------------------- To Do ------------------------------- */
const getToDos = email => api.get(`/todos/${email}`);
const updateToDoCompleted = (id, payload) => api.put(`/todo/completed/${id}`, payload);
const addToDoList = payload => api.post('/todoList', payload);
const addToDoItem = (id, payload) => api.put(`todo/item/${id}`, payload);
const updateToDoListName = (id, payload) => api.put(`/todo/list/${id}`, payload);
const deleteToDoList = id => api.delete(`/todo/list/${id}`);
const deleteToDoItem = (id, payload) => api.delete(`/todo/item/delete/${id}/${payload}`);
const updateToDoItem = (id, payload) => api.put(`/todo/item/update/${id}`, payload);
const getThreeToDos = email => api.get(`/getthreetodos/${email}`);

/* ------------------------------- Photo Journal ------------------------------- */
const createJournalPost = payload => api.post('/journalpost/create', payload);
const getJournalPosts = email => api.get(`/journalposts/${email}`);
const editJournalCaption = (id, payload) => api.put(`/journalpost/edit/${id}`, payload);
const deleteJournalPost = id => api.delete(`/journalpost/delete/${id}`);
const getThreeJournalPosts = email => api.get(`/threejournalpost/${email}`);

/* ------------------------------- Calendar ------------------------------- */
const createCalendarEvent = payload => api.post('/event', payload);
const getCalendarEvents = email => api.get(`/events/${email}`);

const apis = {
    googleLogin,
    getToDos,
    updateToDoCompleted,
    addToDoList,
    addToDoItem,
    updateToDoListName,
    deleteToDoList,
    deleteToDoItem,
    updateToDoItem,
    deleteMember,
    getMembers,
    addMember,
    createJournalPost,
    getJournalPosts,
    editJournalCaption,
    deleteJournalPost,
    createCalendarEvent,
    getCalendarEvents,
    getThreeJournalPosts,
    getThreeToDos,
    registerUser,
    loginUser,
    getUser
}

export default apis