import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";



const PrivateLoginAndRegister = ({ children }) => {
  const { user } = useAuthContext();

  // if (loading) {
  //   return <div style={{height:'50vh'}}>"carregando"</div>;
  // }

  if (user?.name) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateLoginAndRegister;
