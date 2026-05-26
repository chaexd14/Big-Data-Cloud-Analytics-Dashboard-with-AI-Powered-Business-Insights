import axios from 'axios';

const API = axios.create({
    baseURL: '/_/backend/api'
});

export default API;