import { Navigate } from "react-router-dom";
import { UseUserAuth, AuthProviderProps } from "../Context/authContext";

const Protected = ({ children }: AuthProviderProps) => {
  const { currentUser } = UseUserAuth();
  
  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default Protected;