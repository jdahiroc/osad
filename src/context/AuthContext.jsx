/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //sign up function
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in function
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  } 

  //logout funtion
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
