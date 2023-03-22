import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/redux";

interface Props {
  children: JSX.Element;
}

export const PrivateRouter: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? children : <Navigate to="/login" replace />;
};
