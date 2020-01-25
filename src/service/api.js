import axios from 'axios';

const api = axios.create({
    baseURL: 'https://lineup-259509.appspot.com',
});

export default api;