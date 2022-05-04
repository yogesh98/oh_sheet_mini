import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, browserSessionPersistence, setPersistence, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function signup(email, password) {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredentials.user);
    return userCredentials;
  }

  function login(email, password) {
    return setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    });
  }

  function logout() {
    return signOut(auth).then(() => {
      setCurrentUser({});
      navigate("/");
    });
  }

  function resetPassword(email) {
    // return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const authUser = Object.keys(window.sessionStorage).filter(item => item.startsWith('firebase:authUser'))[0];
    if (authUser) {
      setCurrentUser(JSON.parse(window.sessionStorage.getItem(authUser)));
    } else {
      setCurrentUser({});
    }
    setLoading(false);
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}