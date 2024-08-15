import axios from "axios";
import useAuthStore from "../contexts/AuthContext";
// import { useAuth } from "../hooks/useAuth";

const BASE_URL_DEV = 'http://localhost:3000/api';
const BASE_URL_PROD = 'http://localhost:3000/api';

// Determinar la URL de base según el entorno
const baseURL = process.env.NODE_ENV === 'development' ? BASE_URL_DEV : BASE_URL_PROD;

// Crear una instancia de Axios con la URL de base
const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Token ${token.access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;