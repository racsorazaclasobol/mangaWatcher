import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnv';

const { VITE_API_URL } = getEnvVariables();

const mangaApi = axios.create({
    baseURL: VITE_API_URL
});

console.log("******************VITE_API_URL**********************")
console.log( VITE_API_URL )
console.log("*****************/VITE_API_URL**********************")

mangaApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default mangaApi;
