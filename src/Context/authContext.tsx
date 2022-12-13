import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../Firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

export interface AuthProviderProps {
  children: ReactNode;
}

interface authContext {
  currentUser?: User | null;
  createAccount: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  logOut: () => void;
}

export const AuthContext = createContext<authContext>({
  currentUser: undefined,
  createAccount: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  logOut: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAccount = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    });
  };

  const value = {
    currentUser,
    createAccount,
    signIn,
    signInWithGoogle,
    logOut,
  };
  
  return isLoading ? <div>Loading..</div> : <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseUserAuth = () => {
  return useContext(AuthContext);
};
