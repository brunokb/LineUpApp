import axios from 'axios';

const api = axios.create({
//    baseURL: 'https://lineup-259509.appspot.com',
        baseURL: 'http://localhost:8080',
});

export default api;