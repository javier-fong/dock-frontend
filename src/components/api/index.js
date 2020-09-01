import Axios from 'axios';

const api = Axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000',
});

/* -------------------- Google Login -------------------- */
const googleLogin = response => api.post('/googlelogin', {
    tokenId: response.tokenId
}).then(response => {
    console.log('Google login success', response);
    localStorage.setItem('login', JSON.stringify(response.data.user));
    window.location.href = '/app/dashboard';
    console.log(response.data)
}).catch(err => {
    console.log(err);
})

/* -------------------- To Do -------------------- */
const getToDos = email => api.get(`/todos/${email}`);
const updateToDoCompleted = (id, payload) => api.put(`/todo/completed/${id}`, payload);
const addToDoList = payload => api.post('/todoList', payload);
const addToDoItem = (id, payload) => api.put(`todo/${id}`, payload);

const apis = {
    googleLogin,
    getToDos,
    updateToDoCompleted,
    addToDoList,
    addToDoItem
}

export default apis