import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem('accessToken') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,

    setToken: (token) => {
        localStorage.setItem('accessToken', token.access);
        set({ token });
    },
    clearToken: () => {
        localStorage.removeItem('accessToken');
        set({ token: null });
    },

    setUser: (user) => {
        if (user.auth_uid){
            delete user.auth_uid;
        }
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },

    clearUser: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        set({ user: null, token: null });
    }

}));

export default useAuthStore;