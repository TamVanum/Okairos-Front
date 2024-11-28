import { Avatar } from "antd";
import useAuthStore from "../contexts/AuthContext";
import { useState } from "react";

export const useUser = () => {
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);

    const [userData, setUserData] = useState({
        name: user.name || 'default',
        lastname: user.lastname || 'default',
        email: user.email || 'example@gmail.com',
        avatar: user.avatar || 'D',
        plan: user.plan || {},
    }) ;

    const updateUserData = (data) => {
        setUserData(data);
        setUser(data);
    }
    return { userData, updateUserData };
}