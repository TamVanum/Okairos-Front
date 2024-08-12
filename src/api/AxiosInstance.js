import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const BASE_URL_DEV = 'http://localhost:3000/api';
// const BASE_URL_PROD = 'http://localhost:3000/api';


const axiosInstance = () => {
    const { token } = useAuth();
    return axios.create({
        baseURL: BASE_URL_DEV,
        auth: {
            Token: token,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });
};
// export const axiosInstance = axios.create({
//     baseURL: BASE_URL_DEV,
//     auth: {
//         Token: useAuth().token,
//     },
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

export default axiosInstance;