import Axios from 'axios';

const api = Axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000',
});

/* -------------------- To Do -------------------- */
const getToDos = email => api.get(`/todos/${email}`);

const apis = {
    getToDos
}

export default apis