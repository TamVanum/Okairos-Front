import { Avatar } from "antd";
import useAuthStore from "../contexts/AuthContext";
import { useState } from "react";

export const useUser = () => {
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);

    const [userData, _] = useState({
        name: user.name || 'default',
        lastname: user.lastname || 'default',
        email: user.email || 'example@gmail.com',
        avatar: user.avatar || 'D',
    });

    return userData;
}