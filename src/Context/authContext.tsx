import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, provider } from "../Firebase/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";

export interface AuthProviderProps {
  children: ReactNode
}

interface authContext {
  currentUser?: User | null,
  signUp: (email: string, password: string) => void,
  signWithGoogle: () => void,
  logOut: () => void
}

export const AuthContext = createContext<authContext>({
  currentUser: undefined,
  signUp: async () => { },
  signWithGoogle: async () => { },
  logOut: async () => { }
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      else {
        setCurrentUser(null)
      }
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorCode);
        alert(errorMessage);
      });
  }

  const signWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      setCurrentUser(result.user);
    })
  }

  const logOut = () => {
    auth.signOut().then(function () {
      setCurrentUser(null);
    }).catch(function (error) {
      console.log(error);
    })
  }

  return <AuthContext.Provider value={{ currentUser, signUp, signWithGoogle, logOut }}>{children}</AuthContext.Provider>;
};

export const UseUserAuth = () => {
  return useContext(AuthContext);
}