import { ReactNode, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../Firebase/firebase-config";
import React from "react";

const AuthContext = React.createContext<firebase.User | null>(null);

interface AuthProviderProps {
  children?: ReactNode
}

export const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};