import axios from "axios";
import useAuthStore from "../contexts/AuthContext";
// import { useAuth } from "../hooks/useAuth";


const baseURL = import.meta.env.VITE_API_URL;
console.log(baseURL);

// Crear una instancia de Axios con la URL de base
const axiosInstance = axios.create({
    baseURL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token.access) {
            config.headers['Authorization'] = `Token ${token.access}`;
        }
        else {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;