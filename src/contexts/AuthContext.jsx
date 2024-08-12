import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem('accessToken') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,

    setToken: (token) => {
        localStorage.setItem('accessToken', token.access);
        localStorage.setItem('uid', token.uuid);
        set({ token });
    },
    clearToken: () => {
        localStorage.removeItem('accessToken');
        set({ token: null });
    },

    setUser: (user) => {
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