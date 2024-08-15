import create from 'zustand';

const useUserStore = create((set) => ({
  userData: {
    name: 'default',
    lastname: 'default',
    email: 'example@gmail.com',
    avatar: 'D',
  },
  updateUserData: (data) => set((state) => ({
    userData: { ...state.userData, ...data },
  })),
}));

export default useUserStore;