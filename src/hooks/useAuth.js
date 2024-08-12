import useAuthStore from "../contexts/AuthContext"


export const useAuth = () => {
    const user = useAuthStore(state => state.user);
    const token = useAuthStore(state => state.token);
    const setUser = useAuthStore(state => state.setUser);
    const setToken = useAuthStore(state => state.setToken);
    const clearUser = useAuthStore(state => state.clearUser);
    
    return { user, token, setUser, setToken, clearUser };

};