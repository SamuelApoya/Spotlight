// Handles user authentication using Firebase Auth

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
}from 'firebase/auth';
import app from './Firebase';

const auth = getAuth(app);

// Register a new user with email and password
export const signUp =(email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

// Sign in a user with email and password
export const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

// Sign out the current user
export const logout = () => signOut(auth);

// Sign in with Google popup
export const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
};
export  default auth;