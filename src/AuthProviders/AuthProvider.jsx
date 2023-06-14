import { createContext, useEffect } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { app } from "../Firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // user states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // login with google

  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // login with github

  const gprovider = new GithubAuthProvider();
  const handleGitHubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gprovider);
  };

  // create user with email password

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email password

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sen email verification

  const emailSendToV = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // password handle email

  const passwordChangeEmail = () => {
    return sendPasswordResetEmail(auth, user.email);
  };

  // onAuth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // sign out

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    handleGoogleSignIn,
    handleGitHubSignIn,
    logOut,
    loading,
    createUser,
    signIn,
    emailSendToV,
    passwordChangeEmail,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
