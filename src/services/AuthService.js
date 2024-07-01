import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthService = {
    onAuthStateChanged: (callback) => {
        auth.onAuthStateChanged(callback);
    },
    signIn: async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    },
    signOut: async () => {
        return await auth.signOut();
    },
};

export default AuthService;