import React, { useContext, useState, useEffect } from "react"
import { auth } from "firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
    // const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser({});
      // setCurrentUser(user);
      setLoading(false);
    // })

    // return unsubscribe;
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