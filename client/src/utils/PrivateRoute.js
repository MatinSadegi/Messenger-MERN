import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
const signedUser = useSelector((state) => state.auth.user);
  return (
    signedUser ? <Outlet/> : <Navigate to="/auth"/>
  )
};

export default PrivateRoute;
